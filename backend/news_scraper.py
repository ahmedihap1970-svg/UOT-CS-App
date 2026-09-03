import os
import requests
from bs4 import BeautifulSoup
import json

secret_key = os.getenv("FIREBASE_SECRET")
FIREBASE_URL = f"https://universitynewsapp-83f24-default-rtdb.firebaseio.com/news.json?auth={secret_key}"

def load_saved_news():
    try:
        res = requests.get(FIREBASE_URL)
        if res.status_code == 200 and res.json():
            return res.json()
    except:
        pass
    return []

print("جاري سحب الأخبار من المصدر الخام (RSS) لتجاوز مشاكل التصميم الكارتات...")
saved_news = load_saved_news()

if saved_news is None:
    saved_news = []
    
saved_urls = [news.get('url') for news in saved_news if news and 'url' in news]

all_current_news = list(saved_news)
new_updates_count = 0

try:
    # استخدام رابط الـ RSS الخاص بموقع الجامعة (يجلب الأخبار كبيانات خام 100%)
    rss_url = "https://cs.uotechnology.edu.iq/feed/"
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
    
    # جلب البيانات بدون الحاجة لفتح متصفح كروم نهائياً
    response = requests.get(rss_url, headers=headers)
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # البحث عن كل خبر (item) في البيانات الخام
    items = soup.find_all('item')
    
    # نعكس الترتيب حتى نضيف الأخبار القديمة أولاً ثم الأحدث
    for item in reversed(items):
        act_title = item.title.text.strip()
        act_link = item.link.text.strip()
        
        if act_title and act_link:
            if act_link not in saved_urls:
                data_dict = {
                    "id": str(len(all_current_news) + 1), 
                    "title": act_title, 
                    "url": act_link,
                    "category": "أخبار الكلية"
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
    print("حدث خطأ أثناء سحب الأخبار:", e)