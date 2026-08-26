import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NewsScreen() {
  const [newsList, setNewsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // دالة لجلب الأخبار من الفايربيس
  const fetchNewsFromFirebase = async () => {
    try {
      setLoading(true);
      // رابط قاعدة البيانات مالتك بالضبط مثل ما موجود بكود البايثون
      const response = await fetch('https://universitynewsapp-83f24-default-rtdb.firebaseio.com/news.json');
      const data = await response.json();

      if (data) {
        // بما أن الأخبار تنرفع كمصفوفة، نعكسها حتى تظهر الأحدث بالبداية (فوق)
        setNewsList(data);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء جلب الأخبار:", error);
    } finally {
      setLoading(false);
    }
  };

  // يشتغل هذا الكود أول ما تنفتح الصفحة
  useEffect(() => {
    fetchNewsFromFirebase();
  }, []);

  // دالة لفتح رابط الخبر
  const openNewsLink = (url: string) => {
    if (url) {
      Linking.openURL(url).catch(err => console.error("لا يمكن فتح الرابط:", err));
    }
  };

  // تصميم كارت الخبر
  const renderNewsCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.newsCard} 
      activeOpacity={0.7}
      onPress={() => openNewsLink(item.url)}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="newspaper-outline" size={28} color="#60A5FA" />
      </View>
      
      <View style={styles.textContainer}>
        <Text style={styles.newsTitle} numberOfLines={3}>{item.title}</Text>
        <View style={styles.readMoreContainer}>
          <Text style={styles.readMoreText}>التفاصيل</Text>
          <Ionicons name="arrow-back" size={14} color="#1B2A4E" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* الهيدر */}
      <View style={styles.header}>
        <Text style={styles.mainTitle}>الأخبار والإعلانات</Text>
        <View style={styles.titleUnderline} />
      </View>

      {/* عرض حالة التحميل أو قائمة الأخبار */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#1B2A4E" />
          <Text style={styles.loadingText}>جاري تحميل الأخبار...</Text>
        </View>
      ) : newsList.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons name="alert-circle-outline" size={60} color="#CBD5E1" />
          <Text style={styles.emptyText}>لا توجد أخبار حالياً</Text>
        </View>
      ) : (
        <FlatList
          data={newsList}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          renderItem={renderNewsCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          // هاي الميزة تخلي الطالب يسحب ليجوة حتى يحدث الصفحة (Pull to refresh)
          refreshing={loading}
          onRefresh={fetchNewsFromFirebase}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 15, alignItems: 'flex-end', backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  mainTitle: { fontSize: 24, fontWeight: '900', color: '#1B2A4E', marginBottom: 6 },
  titleUnderline: { width: 60, height: 4, backgroundColor: '#D4AF37', borderRadius: 2 },
  
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 15, fontSize: 16, color: '#64748B', fontWeight: '600' },
  emptyText: { marginTop: 15, fontSize: 16, color: '#64748B', fontWeight: '700' },
  
  listContent: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 100 },
  
  newsCard: {
    flexDirection: 'row-reverse',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  newsTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#1E293B',
    textAlign: 'right',
    lineHeight: 22,
    marginBottom: 8,
  },
  readMoreContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  readMoreText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1B2A4E',
    marginLeft: 6,
  },
});