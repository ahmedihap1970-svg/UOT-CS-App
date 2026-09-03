import os
import undetected_chromedriver as uc
from bs4 import BeautifulSoup
import json
import requests
import time

secret_key = os.getenv("FIREBASE_SECRET")
FIREBASE_URL = f"https://universitynewsapp-83f24-default-rtdb.firebaseio.com/news.json?auth={secret_key}"
DATA_FILE = "news_data.json"
MAIN_PAGE_URL = "https://cs.uotechnology.edu.iq/"

def load_saved_news():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    return []

def save_news(data_list):
    with open(DATA_FILE, "w", encoding="utf-8") as file:
        json.dump(data_list, file, ensure_ascii=False, indent=4)

print("جاري تشغيل المتصفح وسحب الأخبار من الصفحة الرئيسية...")
saved_news = load_saved_news()
saved_urls = [news['url'] for news in saved_news]

options = uc.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

# تشغيل المتصفح مع تثبيت إصدار السيرفر
driver = uc.Chrome(options=options, version_main=151)

all_current_news = []
new_updates_count = 0

try:
    driver.get(MAIN_PAGE_URL)
    time.sleep(10) # انتظار إضافي لتحميل البطاقات المتحركة
    
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    
    # البحث عن عناوين الأخبار بتصميم البطاقات الخاص بالصفحة الرئيسية
    news_elements = soup.select('.elementor-post__title a, .entry-title a, .elementor-heading-title a')
    
    for item in news_elements:
        act_link = item.get('href')
        act_title = item.get_text().strip()
        
        # التأكد من أن الرابط والخبر غير فارغين
        if act_title and act_link:
            data_dict = {
                "id": str(len(all_current_news) + 1), 
                "title": act_title, 
                "url": act_link,
                "category": "آخر أخبار الكلية"
            }
            # منع التكرار في القائمة الحالية
            if data_dict not in all_current_news:
                all_current_news.append(data_dict)
                if act_link not in saved_urls:
                    new_updates_count += 1
                    
    if all_current_news:
         save_news(all_current_news)
         requests.put(FIREBASE_URL, json=all_current_news)

    print(f"✅ تم سحب {len(all_current_news)} خبر من الصفحة الرئيسية. (الجديد: {new_updates_count})")

except Exception as e:
    print("حدث خطأ:", e)
finally:
    try:
        driver.quit()
    except:
        pass