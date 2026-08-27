import os
import undetected_chromedriver as uc
from bs4 import BeautifulSoup
import time
import json
import requests

secret_key = os.getenv("FIREBASE_SECRET")
FIREBASE_URL = f"https://universitynewsapp-83f24-default-rtdb.firebaseio.com/activities.json?auth={secret_key}"
DATA_FILE = "activities_data.json"

# الروابط الثلاثة للأقسام
SECTIONS = [
    {
        "category": "النشاطات العلمية",
        "url": "https://cs.uotechnology.edu.iq/_scientific-acivity/#"
    },
    {
        "category": "نشاطات خدمة المجتمع",
        "url": "https://cs.uotechnology.edu.iq/category/_community/#"
    },
    {
        "category": "النشاط الرياضي",
        "url": "https://cs.uotechnology.edu.iq/_sports/#"
    }
]

def load_saved_activities():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as file:
            return json.load(file)
    return []

def save_activities(data_list):
    with open(DATA_FILE, "w", encoding="utf-8") as file:
        json.dump(data_list, file, ensure_ascii=False, indent=4)

def send_to_firebase(data_list):
    try:
        response = requests.put(FIREBASE_URL, json=data_list)
        if response.status_code == 200:
            print("✅ تم رفع كل النشاطات إلى Firebase بنجاح!")
        else:
            print(f"❌ فشل رفع النشاطات. كود الخطأ: {response.status_code}")
    except Exception as e:
        print("حدث خطأ أثناء الاتصال بالفايربيس:", e)

print("جاري تشغيل المتصفح وسحب البيانات من كل الأقسام...")
saved_activities = load_saved_activities()
saved_urls = [act['url'] for act in saved_activities]

# إعدادات مخصصة لتشغيل المتصفح على السيرفرات السحابية (بدون شاشة)
options = uc.ChromeOptions()
options.add_argument('--headless')
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')

# تشغيل المتصفح مع الإعدادات الجديدة (بدون تحديد رقم الإصدار)
driver = uc.Chrome(options=options, version_main=151)

all_current_data = []
new_updates_count = 0

try:
    for section in SECTIONS:
        category_name = section["category"]
        page_url = section["url"]
        
        print(f"\nجاري الدخول وسحب بيانات: {category_name}...")
        driver.get(page_url)
        time.sleep(8)
        
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        
        # قائمة مؤقتة لخزن نشاطات هذي الصفحة قبل إضافتها للقائمة الرئيسية
        page_extracted_data = []

        # 1. البحث بالتصميم الأول (قائمة Elementor - مثل النشاطات العلمية والرياضية)
        elementor_items = soup.find_all('li', class_='elementor-icon-list-item')
        for item in elementor_items:
            link_tag = item.find('a')
            title_tag = item.find('span', class_='elementor-icon-list-text')
            if link_tag and title_tag:
                act_link = link_tag.get('href')
                act_title = title_tag.get_text().strip()
                if act_title:
                    page_extracted_data.append({"title": act_title, "url": act_link})

        # 2. البحث بالتصميم الثاني (مقالات WordPress - مثل خدمة المجتمع)
        article_items = soup.find_all('h2', class_='entry-title')
        for item in article_items:
            link_tag = item.find('a')
            if link_tag:
                act_link = link_tag.get('href')
                act_title = link_tag.get_text().strip()
                if act_title:
                    page_extracted_data.append({"title": act_title, "url": act_link})

        # إضافة البيانات اللي استخرجناها من هاي الصفحة للقائمة الرئيسية
        for data in page_extracted_data:
            data_dict = {
                "id": str(len(all_current_data) + 1), 
                "title": data["title"], 
                "url": data["url"],
                "category": category_name
            }
            all_current_data.append(data_dict)
            
            if data["url"] not in saved_urls:
                new_updates_count += 1
                
    # الرفع للفايربيس
    if all_current_data:
         save_activities(all_current_data)
         send_to_firebase(all_current_data)

    print("\n" + "="*60)
    print(f"🎉 تم تحديث قاعدة بيانات النشاطات بالكامل! (الجديد: {new_updates_count})")
    print("="*60 + "\n")

except Exception as e:
    print("حدث خطأ رئيسي:", e)
finally:
    try:
        driver.quit()
    except OSError:
        pass