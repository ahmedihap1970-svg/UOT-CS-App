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
  Linking,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// الأقسام المتاحة
const categories = ['الكل', 'النشاطات العلمية', 'نشاطات خدمة المجتمع', 'النشاط الرياضي'];

export default function ActivitiesScreen() {
  const [activeCategory, setActiveCategory] = useState('الكل');
  const [activitiesList, setActivitiesList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // جلب البيانات من الفايربيس
  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://universitynewsapp-83f24-default-rtdb.firebaseio.com/activities.json');
      const data = await response.json();

      if (data) {
        setActivitiesList(data);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء جلب النشاطات:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const openLink = (url: string) => {
    if (url) {
      Linking.openURL(url).catch(err => console.error("لا يمكن فتح الرابط:", err));
    }
  };

  // فلترة النشاطات حسب القسم المختار
  const filteredActivities = activitiesList.filter(item => 
    activeCategory === 'الكل' ? true : item.category === activeCategory
  );

  const renderActivityCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.7}
      onPress={() => openLink(item.url)}
    >
      <View style={styles.cardHeader}>
        <View style={styles.categoryBadge}>
          <Ionicons name="cube-outline" size={14} color="#1B2A4E" />
          <Text style={styles.categoryText}>{item.category || 'نشاط'}</Text>
        </View>
      </View>
      
      <Text style={styles.title} numberOfLines={3}>{item.title}</Text>
      
      <View style={styles.footer}>
        <View style={styles.readMore}>
          <Text style={styles.readMoreText}>التفاصيل</Text>
          <Ionicons name="arrow-back" size={16} color="#FFFFFF" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* الهيدر */}
      <View style={styles.header}>
        <Text style={styles.mainTitle}>النشاطات</Text>
        <View style={styles.titleUnderline} />
      </View>

      {/* شريط الأقسام (الفلاتر) */}
      <View style={styles.categoriesContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
          {categories.map((cat, index) => (
            <TouchableOpacity 
              key={index}
              style={[styles.categoryChip, activeCategory === cat && styles.activeCategoryChip]}
              onPress={() => setActiveCategory(cat)}
              activeOpacity={0.8}
            >
              <Text style={[styles.chipText, activeCategory === cat && styles.activeChipText]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* القائمة */}
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#1B2A4E" />
          <Text style={styles.loadingText}>جاري تحميل النشاطات...</Text>
        </View>
      ) : filteredActivities.length === 0 ? (
        <View style={styles.centerContainer}>
          <Ionicons name="flask-outline" size={60} color="#CBD5E1" />
          <Text style={styles.emptyText}>لا توجد نشاطات في هذا القسم حالياً</Text>
        </View>
      ) : (
        <FlatList
          data={filteredActivities}
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          renderItem={renderActivityCard}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshing={loading}
          onRefresh={fetchActivities}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, alignItems: 'flex-end', backgroundColor: '#F8F9FA' },
  mainTitle: { fontSize: 26, fontWeight: '900', color: '#1A1A2E', marginBottom: 8 },
  titleUnderline: { width: 70, height: 4, backgroundColor: '#D4AF37', borderRadius: 2 },
  
  categoriesContainer: { paddingBottom: 15, backgroundColor: '#F8F9FA' },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', marginLeft: 10 },
  activeCategoryChip: { backgroundColor: '#1B2A4E', borderColor: '#1B2A4E' }, // اللون النيلي
  chipText: { fontSize: 13, fontWeight: '700', color: '#64748B' },
  activeChipText: { color: '#FFFFFF' },

  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  loadingText: { marginTop: 15, fontSize: 16, color: '#64748B', fontWeight: '600' },
  emptyText: { marginTop: 15, fontSize: 16, color: '#64748B', fontWeight: '700' },
  
  listContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 100 },
  
  card: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2, borderWidth: 1, borderColor: '#F1F5F9' },
  cardHeader: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  categoryBadge: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#F1F5F9', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  categoryText: { fontSize: 11, fontWeight: '800', color: '#1B2A4E', marginRight: 4 },
  title: { fontSize: 16, fontWeight: '900', color: '#1E293B', textAlign: 'right', lineHeight: 24, marginBottom: 15 },
  footer: { alignItems: 'flex-start' },
  readMore: { flexDirection: 'row-reverse', alignItems: 'center', backgroundColor: '#1B2A4E', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  readMoreText: { fontSize: 12, fontWeight: '800', color: '#FFFFFF', marginLeft: 6 },
});