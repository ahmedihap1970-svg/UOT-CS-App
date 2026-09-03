import os
import undetected_chromedriver as uc
from bs4 import BeautifulSoup
import requests
import time

secret_key = os.getenv("FIREBASE_SECRET")
FIREBASE_URL = f"https://universitynewsapp-83f24-default-rtdb.firebaseio.com/news.json?auth={secret_key}"
MAIN_PAGE_URL = "https://cs.uotechnology.edu.iq/"

# 1. سحب الأخبار من الفايربيس مباشرة لحل مشكلة مسح البيانات في سيرفرات GitHub
def load_saved_news():
    try:
        response = requests.get(FIREBASE_URL)
        if response.status_code == 200 and response.json():
            return response.json()
    except:
        pass
    return []

print("جاري تشغيل المتصفح...")
saved_news = load_saved_news()

if saved_news is None:
    saved_news = []
    
saved_urls = [news['url'] for news in saved_news if news and 'url' in news]

options = uc.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

driver = uc.Chrome(options=options, version_main=151)

all_current_news = list(saved_news)
new_updates_count = 0

try:
    driver.get(MAIN_PAGE_URL)
    time.sleep(5)
    
    # 2. النزول لأسفل الصفحة برمجياً لتفعيل التحميل المخفي (Lazy Load) للبطاقات
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
    time.sleep(10)
    
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    
    news_elements = soup.select('.elementor-icon-list-item a, .thim-ekits-post__title a, .elementor-post__title a, .entry-title a, .elementor-heading-title a')
    
    for item in news_elements:
        act_link = item.get('href')
        act_title = item.get_text().strip()
        
        if act_title and act_link:
            if act_link not in saved_urls:
                data_dict = {
                    "id": str(len(all_current_news) + 1), 
                    "title": act_title, 
                    "url": act_link,
                    "category": "أخبار الجامعة"
                }
                # إضافة الخبر الجديد في بداية القائمة
                all_current_news.insert(0, data_dict)
                saved_urls.append(act_link)
                new_updates_count += 1
                    
    if new_updates_count > 0:
         requests.put(FIREBASE_URL, json=all_current_news)
         print(f"✅ تم سحب ورفع {new_updates_count} خبر جديد بنجاح!")
    else:
         print("🛑 لا توجد أخبار جديدة للرفع.")

except Exception as e:
    print("حدث خطأ:", e)
finally:
    try:
        driver.quit()
    except:
        pass