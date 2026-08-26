import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// البيانات الوهمية لقسم الطلاب
const studentServices = {
  undergrad: [
    { id: 1, title: 'جدول المحاضرات الأسبوعي', icon: 'calendar-outline', color: '#3B82F6', desc: 'عرض أوقات المحاضرات والقاعات الدراسية' },
    { id: 2, title: 'نظام الغيابات الإلكتروني', icon: 'stats-chart-outline', color: '#F59E0B', desc: 'متابعة سجل الحضور والغيابات والإنذارات' },
    { id: 3, title: 'النتائج الامتحانية', icon: 'document-text-outline', color: '#10B981', desc: 'عرض درجات الكورسات والامتحانات النهائية' },
    { id: 4, title: 'البطاقة الجامعية', icon: 'id-card-outline', color: '#8B5CF6', desc: 'إصدار أو تجديد الهوية الجامعية للطالب' },
  ],
  postgrad: [
    { id: 5, title: 'بوابة التقديم والقبول', icon: 'school-outline', color: '#D47A92', desc: 'متابعة خطة القبول واستمارات التقديم' },
    { id: 6, title: 'متابعة سير البحث', icon: 'flask-outline', color: '#1E3A8A', desc: 'سجل السمنارات وتقييم المشرفين' },
    { id: 7, title: 'استمارات المناقشة', icon: 'layers-outline', color: '#F97316', desc: 'تحميل استمارات إقرار الخطة وتشكيل اللجان' },
    { id: 8, title: 'التعليمات والضوابط', icon: 'information-circle-outline', color: '#475569', desc: 'قوانين الدراسات العليا وضوابط النشر العلمي' },
  ]
};

export default function StudentsScreen() {
  // حالة (State) لتحديد القسم المعروض: 'undergrad' للأولية، 'postgrad' للعليا
  const [activeTab, setActiveTab] = useState('undergrad'); 
  const bgColor = '#F8F9FA';

  const currentServices = activeTab === 'undergrad' ? studentServices.undergrad : studentServices.postgrad;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar barStyle="dark-content" backgroundColor={bgColor} />

      <View style={styles.headerContainer}>
        <Text style={styles.mainTitle}>شؤون الطلبة</Text>
        <View style={styles.titleUnderline} />
      </View>

      {/* ========================================
           أزرار التبديل (Segmented Control)
           ======================================== */}
      <View style={styles.segmentContainer}>
        <TouchableOpacity 
          style={[styles.segmentButton, activeTab === 'postgrad' && styles.segmentActive]}
          onPress={() => setActiveTab('postgrad')}
          activeOpacity={0.8}
        >
          <Text style={[styles.segmentText, activeTab === 'postgrad' && styles.segmentTextActive]}>
            الدراسات العليا
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.segmentButton, activeTab === 'undergrad' && styles.segmentActive]}
          onPress={() => setActiveTab('undergrad')}
          activeOpacity={0.8}
        >
          <Text style={[styles.segmentText, activeTab === 'undergrad' && styles.segmentTextActive]}>
            الدراسة الأولية
          </Text>
        </TouchableOpacity>
      </View>

      {/* ========================================
           قائمة الخدمات
           ======================================== */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {currentServices.map((item) => (
          <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.serviceCard}>
            
            {/* الأيقونة */}
            <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
              <Ionicons name={item.icon as any} size={28} color={item.color} />
            </View>

            {/* النصوص */}
            <View style={styles.textContainer}>
              <Text style={styles.serviceTitle}>{item.title}</Text>
              <Text style={styles.serviceDesc}>{item.desc}</Text>
            </View>

            {/* سهم صغير للدلالة على الضغط */}
            <Ionicons name="chevron-back" size={20} color="#CBD5E1" style={styles.chevronIcon} />

          </TouchableOpacity>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: { paddingHorizontal: 20, paddingTop: 20, marginBottom: 20, alignItems: 'flex-end' },
  mainTitle: { fontSize: 26, fontWeight: '900', color: '#1A1A2E', marginBottom: 8 },
  titleUnderline: { width: 70, height: 4, backgroundColor: '#D4AF37', borderRadius: 2 },
  
  /* ستايلات أزرار التبديل */
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#E2E8F0',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748B',
  },
  segmentTextActive: {
    color: '#1A1A2E',
    fontWeight: '800',
  },

  scrollContent: { paddingHorizontal: 20, paddingBottom: 20 },

  /* ستايلات كارت الخدمة */
  serviceCard: {
    flexDirection: 'row-reverse',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16, // مسافة بين الأيقونة والنص
  },
  textContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
    textAlign: 'right',
  },
  serviceDesc: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'right',
    lineHeight: 18,
  },
  chevronIcon: {
    marginRight: 10,
  },

  bottomSpacer: { height: 100 },
});