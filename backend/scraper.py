import os
import undetected_chromedriver as uc
from bs4 import BeautifulSoup
import time
import json
import requests # ضفنا مكتبة الطلبات

secret_key = os.getenv("FIREBASE_SECRET")
# رابط الفايربيس مالتك (لازم ينتهي بـ /news.json حتى نخلق مجلد اسمه news)
FIREBASE_URL = f"https://universitynewsapp-83f24-default-rtdb.firebaseio.com/news.json?auth={secret_key}"
DATA_FILE = "news_data.json"

def load_saved_news():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    return []

def save_news(news_list):
    with open(DATA_FILE, "w", encoding="utf-8") as file:
        json.dump(news_list, file, ensure_ascii=False, indent=4)

# دالة جديدة لإرسال الأخبار للفايربيس
def send_to_firebase(news_data):
    try:
        # نستخدم PUT حتى نستبدل الأخبار القديمة بالجديدة دائماً
        response = requests.put(FIREBASE_URL, json=news_data)
        if response.status_code == 200:
            print("✅ تم رفع الأخبار إلى قاعدة بيانات Firebase بنجاح!")
        else:
            print(f"❌ فشل رفع الأخبار. كود الخطأ: {response.status_code}")
    except Exception as e:
        print("حدث خطأ أثناء الاتصال بالفايربيس:", e)

print("جاري فتح المتصفح وفحص الأخبار الجديدة...")
saved_news = load_saved_news()
saved_urls = [news['url'] for news in saved_news]

# إعدادات التخفي للسيرفر (Headless)
options = uc.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

# تشغيل المتصفح مع الإعدادات
driver = uc.Chrome(options=options)
url = "https://cs.uotechnology.edu.iq/_scientific-acivity/#"

try:
    driver.get(url)
    time.sleep(8)
    
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    news_items = soup.find_all('li', class_='elementor-icon-list-item')
    
    new_updates = []
    all_current_news = []
    
    for item in news_items:
        link_tag = item.find('a')
        title_tag = item.find('span', class_='elementor-icon-list-text')
        
        if not link_tag or not title_tag:
            continue
            
        news_link = link_tag.get('href')
        news_title = title_tag.get_text().strip()
        
        if news_title:
            # ضفنا id للخبر حتى التطبيق يكدر يقرأه بشكل صحيح
            news_dict = {"id": str(len(all_current_news) + 1), "title": news_title, "url": news_link}
            all_current_news.append(news_dict)
            
            if news_link not in saved_urls:
                new_updates.append(news_dict)
    
    # دائماً نرفع أحدث نسخة من الأخبار للفايربيس
    if all_current_news:
         save_news(all_current_news)
         send_to_firebase(all_current_news) # هنا الإرسال

    print("\n" + "="*60)
    if len(new_updates) > 0:
        print(f"🎉 لگينا {len(new_updates)} أخبار جديدة وتم رفعها للتطبيق!")
    else:
        print("🛑 ماكو أي أخبار جديدة حالياً، بس تم تحديث قاعدة البيانات احتياطياً.")
    print("="*60 + "\n")

except Exception as e:
    print("حدث خطأ رئيسي:", e)

finally:
    try:
        driver.quit()
    except OSError:
        pass