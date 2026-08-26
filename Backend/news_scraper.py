import os
import undetected_chromedriver as uc
from bs4 import BeautifulSoup
import time
import json
import os
import requests
import re  # مكتبة جديدة للبحث عن التاريخ واستخراجه
secret_key = os.getenv("FIREBASE_SECRET")
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

def send_to_firebase(news_data):
    try:
        response = requests.put(FIREBASE_URL, json=news_data)
        if response.status_code == 200:
            print("✅ تم رفع الأخبار إلى Firebase بنجاح!")
        else:
            print(f"❌ فشل رفع الأخبار. كود الخطأ: {response.status_code}")
    except Exception as e:
        print("حدث خطأ أثناء الاتصال بالفايربيس:", e)

print("جاري الدخول للصفحة الرئيسية للكلية وسحب آخر الأخبار...")
saved_news = load_saved_news()
saved_urls = [news['url'] for news in saved_news]

driver = uc.Chrome(version_main=151)
url = "https://cs.uotechnology.edu.iq/"

try:
    driver.get(url)
    time.sleep(10) # ننتظر حتى يكمل تحميل السلايدر
    
    html = driver.page_source
    soup = BeautifulSoup(html, 'html.parser')
    
    raw_news = []
    seen_urls = set() # المصفوفة الذكية لمنع التكرار
    
    news_items = soup.find_all('p', class_='thim-ekits-post__title')
    
    for item in news_items:
        link_tag = item.find('a')
        
        if not link_tag:
            continue
            
        news_link = link_tag.get('href')
        news_title = link_tag.get_text().strip()
        
        # التأكد إن الخبر بي عنوان ورابط، وما مسحوب قبل (لمنع التكرار)
        if news_title and news_link and news_link not in seen_urls:
            seen_urls.add(news_link)
            
            # محاولة استخراج التاريخ من الرابط (مثال: 2026-08-23)
            date_match = re.search(r'(\d{4}-\d{2}-\d{2})', news_link)
            # إذا لكه تاريخ ياخذه، وإذا لا يحط تاريخ قديم حتى ينزل بالاخير
            news_date = date_match.group(1) if date_match else "2000-01-01" 
            
            raw_news.append({
                "title": news_title, 
                "url": news_link,
                "date": news_date
            })
            
    # 💡 السحر هنا: ترتيب الأخبار بناءً على التاريخ من الأحدث للأقدم
    raw_news.sort(key=lambda x: x['date'], reverse=True)
    
    # بعد الترتيب، ننطيها ID منظم ونجهزها للرفع
    all_current_news = []
    new_updates = []
    
    for index, news in enumerate(raw_news):
        news_dict = {
            "id": str(index + 1),
            "title": news['title'],
            "url": news['url'],
            "date": news['date'] # احتفظنا بالتاريخ، ممكن يفيدنا نعرضه بالتطبيق مستقبلاً!
        }
        all_current_news.append(news_dict)
        
        if news['url'] not in saved_urls:
            new_updates.append(news_dict)
    
    # رفع الأخبار للفايربيس
    if all_current_news:
         save_news(all_current_news)
         send_to_firebase(all_current_news)

    print("\n" + "="*60)
    if len(new_updates) > 0:
        print(f"🎉 لگينا {len(new_updates)} أخبار جديدة وتم رفعها مرتبة للتطبيق!")
    else:
        print("🛑 ماكو أي أخبار جديدة حالياً، بس تم إعادة ترتيب وتحديث القاعدة.")
    print("="*60 + "\n")

except Exception as e:
    print("حدث خطأ رئيسي:", e)
finally:
    try:
        driver.quit()
    except OSError:
        pass