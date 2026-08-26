import React from 'react';
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
import { useRouter, Stack } from 'expo-router';

const sdgGoals = [
  { id: 1, title: 'القضاء على الفقر', icon: 'people', color: '#E5243B' },
  { id: 2, title: 'القضاء التام على الجوع', icon: 'restaurant', color: '#DDA63A' },
  { id: 3, title: 'الصحة الجيدة والرفاه', icon: 'medkit', color: '#4C9F38' },
  { id: 4, title: 'التعليم الجيد', icon: 'book', color: '#C5192D' },
  { id: 5, title: 'المساواة بين الجنسين', icon: 'male-female', color: '#FF3A21' },
  { id: 6, title: 'المياه النظيفة والصرف الصحي', icon: 'water', color: '#26BDE2' },
  { id: 7, title: 'طاقة نظيفة وبأسعار معقولة', icon: 'bulb', color: '#FCC30B' },
  { id: 8, title: 'العمل اللائق ونمو الاقتصاد', icon: 'briefcase', color: '#A21942' },
  { id: 9, title: 'الصناعة والابتكار', icon: 'construct', color: '#FD6925' },
  { id: 10, title: 'الحد من أوجه عدم المساواة', icon: 'git-compare', color: '#DD1367' },
  { id: 11, title: 'مدن ومجتمعات مستدامة', icon: 'business', color: '#FD9D24' },
  { id: 12, title: 'الاستهلاك والإنتاج المسؤولان', icon: 'sync-circle', color: '#BF8B2E' },
  { id: 13, title: 'العمل المناخي', icon: 'earth', color: '#3F7E44' },
  { id: 14, title: 'الحياة تحت الماء', icon: 'boat', color: '#0A97D9' },
  { id: 15, title: 'الحياة في البر', icon: 'leaf', color: '#56C02B' },
  { id: 16, title: 'السلام والعدل والمؤسسات القوية', icon: 'scale', color: '#00689D' },
  { id: 17, title: 'الشراكات لتحقيق الأهداف', icon: 'globe', color: '#19486A' },
];

export default function SDGsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()} activeOpacity={0.7}>
          <Ionicons name="chevron-forward" size={24} color="#1B2A4E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>أهداف التنمية المستدامة</Text>
        <View style={styles.spacer} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.introContainer}>
          <Ionicons name="leaf" size={40} color="#10B981" style={{ marginBottom: 10 }} />
          <Text style={styles.introText}>
            تلتزم كلية علوم الحاسوب بتطبيق أهداف التنمية المستدامة الـ 17 لضمان بناء بيئة تعليمية تكنولوجية تخدم المجتمع وتحمي كوكبنا.
          </Text>
        </View>

        <View style={styles.listContainer}>
          {sdgGoals.map((goal) => (
            <TouchableOpacity 
              key={goal.id} 
              style={styles.goalCard}
              activeOpacity={0.7}
              // هنا ضفنا التوجيه للصفحة الجديدة مع تمرير رقم الهدف
              onPress={() => router.push({ pathname: '/sdg-details', params: { id: goal.id } })}
            >
              <View style={[styles.iconBox, { backgroundColor: goal.color + '15' }]}>
                <Ionicons name={goal.icon as any} size={28} color={goal.color} />
              </View>

              <View style={styles.textContainer}>
                <Text style={[styles.goalNumber, { color: goal.color }]}>الهدف {goal.id}</Text>
                <Text style={styles.goalTitle}>{goal.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  backButton: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#F1F5F9', justifyContent: 'center', alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '900', color: '#1B2A4E' },
  spacer: { width: 40 },
  scrollContent: { paddingHorizontal: 20, paddingBottom: 40, paddingTop: 15 },
  introContainer: { alignItems: 'center', backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 5, elevation: 1 },
  introText: { fontSize: 14, fontWeight: '700', color: '#64748B', textAlign: 'center', lineHeight: 24 },
  listContainer: { gap: 12 },
  goalCard: { flexDirection: 'row-reverse', backgroundColor: '#FFFFFF', borderRadius: 16, padding: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 5, elevation: 1 },
  iconBox: { width: 55, height: 55, borderRadius: 14, justifyContent: 'center', alignItems: 'center', marginLeft: 15 },
  textContainer: { flex: 1, alignItems: 'flex-end' },
  goalNumber: { fontSize: 11, fontWeight: '900', marginBottom: 4 },
  goalTitle: { fontSize: 15, fontWeight: '800', color: '#1E293B', textAlign: 'right' },
});