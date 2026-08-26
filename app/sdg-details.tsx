import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';

// البيانات كاملة مع الوصف المختصر اللي أخذته من جدولك
const sdgDetailsData = [
  { id: 1, title: 'القضاء على الفقر', desc: 'إنهاء الفقر بجميع أشكاله', icon: 'people', color: '#E5243B' },
  { id: 2, title: 'القضاء على الجوع', desc: 'القضاء على الجوع وتحقيق الأمن الغذائي', icon: 'restaurant', color: '#DDA63A' },
  { id: 3, title: 'الصحة الجيدة والرفاه', desc: 'صحة ورفاه للجميع في كل الأعمار', icon: 'medkit', color: '#4C9F38' },
  { id: 4, title: 'التعليم الجيد', desc: 'تعليم شامل وعادل وفرص تعلّم مستمرة', icon: 'book', color: '#C5192D' },
  { id: 5, title: 'المساواة بين الجنسين', desc: 'تمكين النساء والفتيات', icon: 'male-female', color: '#FF3A21' },
  { id: 6, title: 'المياه النظيفة والصرف الصحي', desc: 'مياه وصرف صحي مستدام للجميع', icon: 'water', color: '#26BDE2' },
  { id: 7, title: 'طاقة نظيفة وبأسعار معقولة', desc: 'طاقة حديثة ومستدامة للجميع', icon: 'bulb', color: '#FCC30B' },
  { id: 8, title: 'العمل اللائق ونمو الاقتصاد', desc: 'نمو اقتصادي وعمل لائق', icon: 'briefcase', color: '#A21942' },
  { id: 9, title: 'الصناعة والابتكار', desc: 'بنى تحتية مرنة وابتكار مستدام', icon: 'construct', color: '#FD6925' },
  { id: 10, title: 'الحد من عدم المساواة', desc: 'تقليل الفوارق داخل الدول وبينها', icon: 'git-compare', color: '#DD1367' },
  { id: 11, title: 'مدن ومجتمعات مستدامة', desc: 'مدن آمنة وشاملة ومستدامة', icon: 'business', color: '#FD9D24' },
  { id: 12, title: 'الاستهلاك والإنتاج المسؤولان', desc: 'أنماط إنتاج واستهلاك مستدامة', icon: 'sync-circle', color: '#BF8B2E' },
  { id: 13, title: 'العمل المناخي', desc: 'مواجهة تغيّر المناخ', icon: 'earth', color: '#3F7E44' },
  { id: 14, title: 'الحياة تحت الماء', desc: 'حماية البحار والموارد البحرية', icon: 'boat', color: '#0A97D9' },
  { id: 15, title: 'الحياة في البر', desc: 'حماية النظم البيئية والتنوع الحيوي', icon: 'leaf', color: '#56C02B' },
  { id: 16, title: 'السلام والعدل والمؤسسات القوية', desc: 'عدالة ومؤسسات فعالة', icon: 'scale', color: '#00689D' },
  { id: 17, title: 'الشراكات لتحقيق الأهداف', desc: 'تعاون عالمي لتحقيق التنمية', icon: 'globe', color: '#19486A' },
];

export default function SdgDetailsScreen() {
  const router = useRouter();
  
  // استلام رقم الهدف (ID) من الصفحة السابقة
  const { id } = useLocalSearchParams();
  
  // البحث عن معلومات الهدف المطلوب
  const goal = sdgDetailsData.find(g => g.id === Number(id));

  // في حال لم يتم العثور على الهدف
  if (!goal) return null;

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* هيدر الصفحة */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-forward" size={24} color="#1B2A4E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>تفاصيل الهدف</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* الأيقونة الدائرية الكبيرة */}
        <View style={[styles.iconWrapper, { backgroundColor: goal.color + '15' }]}>
          <Ionicons name={goal.icon as any} size={80} color={goal.color} />
        </View>

        {/* رقم واسم الهدف */}
        <View style={[styles.badge, { backgroundColor: goal.color }]}>
          <Text style={styles.badgeText}>الهدف {goal.id}</Text>
        </View>
        <Text style={styles.mainTitle}>{goal.title}</Text>

        {/* كارت الوصف المختصر */}
        <View style={styles.descBox}>
          <View style={styles.descHeader}>
            <Ionicons name="information-circle" size={22} color={goal.color} style={{ marginLeft: 8 }} />
            <Text style={[styles.descLabel, { color: goal.color }]}>الوصف المختصر</Text>
          </View>
          <View style={[styles.divider, { backgroundColor: goal.color + '20' }]} />
          <Text style={styles.descText}>{goal.desc}</Text>
        </View>

        {/* رسالة إضافية توضح دور الكلية */}
        <View style={styles.footerBox}>
          <Ionicons name="school" size={24} color="#64748B" style={{ marginBottom: 10 }} />
          <Text style={styles.footerText}>
            تسعى كلية علوم الحاسوب للمساهمة في تحقيق هذا الهدف من خلال مناهجها الأكاديمية والأنشطة الطلابية والمشاريع التقنية.
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#FFFFFF',
    borderBottomWidth: 1, borderBottomColor: '#F1F5F9',
  },
  backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#1B2A4E' },
  spacer: { width: 40 },
  
  content: { paddingHorizontal: 20, paddingTop: 40, paddingBottom: 40, alignItems: 'center' },
  
  iconWrapper: {
    width: 140, height: 140, borderRadius: 70,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 20,
  },
  badge: { paddingHorizontal: 16, paddingVertical: 6, borderRadius: 20, marginBottom: 15 },
  badgeText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  mainTitle: { fontSize: 24, fontWeight: '900', color: '#1E293B', textAlign: 'center', marginBottom: 30 },
  
  descBox: {
    width: '100%', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 20,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.04, shadowRadius: 8, elevation: 2,
    marginBottom: 20,
  },
  descHeader: { flexDirection: 'row-reverse', alignItems: 'center', marginBottom: 15 },
  descLabel: { fontSize: 16, fontWeight: '900' },
  divider: { height: 1, width: '100%', marginBottom: 15 },
  descText: { fontSize: 18, fontWeight: '700', color: '#334155', textAlign: 'center', lineHeight: 28 },

  footerBox: { width: '100%', backgroundColor: '#F1F5F9', borderRadius: 16, padding: 20, alignItems: 'center', marginTop: 10 },
  footerText: { fontSize: 13, fontWeight: '600', color: '#64748B', textAlign: 'center', lineHeight: 22 },
});