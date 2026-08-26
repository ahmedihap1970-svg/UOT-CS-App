import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const pageBgColor = '#FFFFFF'; 
  const navyCardColor = '#1B2A4E'; 
  
  const router = useRouter(); 
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: pageBgColor }]}>
      <StatusBar barStyle="dark-content" backgroundColor={pageBgColor} />
      
      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        
        {/* هيدر الترحيب */}
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.greetingText}>مرحباً بك في</Text>
            <Text style={styles.collegeName}>كلية علوم الحاسوب</Text>
            <Text style={styles.universityName}>الجامعة التكنولوجية</Text>
          </View>
          <View style={styles.logoContainer}>
            <Ionicons name="school" size={45} color={navyCardColor} />
          </View>
        </View>

        {/* صورة الكلية (البانر) */}
        <View style={styles.bannerContainer}>
          <Image 
            source={require('../../assets/images/college.jpg')} 
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>الريادة في التكنولوجيا والابتكار</Text>
          </View>
        </View>

        {/* إحصائيات الكلية */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>إحصائيات الكلية</Text>
        </View>

        <View style={styles.gridContainer}>
          <View style={[styles.statCard, { backgroundColor: navyCardColor }]}>
            <View style={styles.iconCircle}>
              <Ionicons name="people" size={26} color="#F9D242" />
            </View>
            <Text style={styles.statNumber}>1,500+</Text>
            <Text style={styles.statLabel}>طالب وطالبة</Text>
          </View>

          <View style={[styles.statCard, { backgroundColor: navyCardColor }]}>
            <View style={styles.iconCircle}>
              <Ionicons name="ribbon" size={26} color="#D47A92" />
            </View>
            <Text style={styles.statNumber}>120+</Text>
            <Text style={styles.statLabel}>عضو هيئة تدريس</Text>
          </View>
        </View>

        {/* أقسام الكلية */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>أقسام الكلية</Text>
        </View>

        <View style={styles.actionGrid}>
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: navyCardColor }]} 
            activeOpacity={0.8}
            onPress={() => router.push('/news')}
          >
            <Ionicons name="newspaper" size={32} color="#60A5FA" style={styles.actionIcon} />
            <Text style={styles.actionText}>الأخبار والإعلانات</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionCard, { backgroundColor: navyCardColor }]} 
            activeOpacity={0.8}
            onPress={() => router.push('/activities')}
          >
            <Ionicons name="flask" size={32} color="#34D399" style={styles.actionIcon} />
            <Text style={styles.actionText}>النشاطات العلمية</Text>
          </TouchableOpacity>
        </View>

        {/* ========================================
             كارت أهداف التنمية المستدامة (تم تصليح الربط هنا)
             ======================================== */}
        <TouchableOpacity 
          style={[styles.wideCard, { backgroundColor: navyCardColor }]} 
          activeOpacity={0.8}
          onPress={() => router.push('/sdgs')} // الربط المباشر والآمن
        >
          <View style={styles.wideCardContent}>
            <Text style={styles.wideCardTitle}>أهداف التنمية المستدامة</Text>
            <Text style={styles.wideCardDesc}>رؤية الكلية لتحقيق بيئة تعليمية ومجتمعية مستدامة</Text>
          </View>
          <View style={styles.wideCardIcon}>
            <Ionicons name="leaf" size={40} color="#10B981" />
          </View>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 10 },
  header: { flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 10 },
  headerTextContainer: { alignItems: 'flex-end', flex: 1 },
  greetingText: { fontSize: 16, color: '#64748B', fontWeight: '600', marginBottom: 4 },
  collegeName: { fontSize: 24, fontWeight: '900', color: '#1B2A4E', marginBottom: 2 },
  universityName: { fontSize: 14, fontWeight: '700', color: '#D4AF37' },
  logoContainer: { backgroundColor: '#F1F5F9', width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginLeft: 15 },
  bannerContainer: { width: '100%', height: 180, borderRadius: 20, overflow: 'hidden', marginBottom: 30, shadowColor: '#000', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 5, backgroundColor: '#E2E8F0' },
  bannerImage: { width: '100%', height: '100%' },
  bannerOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(27, 42, 78, 0.4)', justifyContent: 'flex-end', alignItems: 'flex-end', padding: 15 },
  bannerTitle: { color: '#FFFFFF', fontSize: 16, fontWeight: '800', textShadowColor: 'rgba(0, 0, 0, 0.5)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4 },
  sectionHeader: { alignItems: 'flex-end', marginBottom: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A2E' },
  gridContainer: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 30 },
  statCard: { width: '48%', borderRadius: 16, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 5 },
  iconCircle: { backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  statNumber: { fontSize: 22, fontWeight: '900', color: '#FFFFFF', marginBottom: 4 },
  statLabel: { fontSize: 12, fontWeight: '600', color: '#CBD5E1' },
  actionGrid: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 15 },
  actionCard: { width: '48%', borderRadius: 16, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 5 },
  actionIcon: { marginBottom: 12 },
  actionText: { fontSize: 14, fontWeight: '800', color: '#FFFFFF', textAlign: 'center' },
  wideCard: { flexDirection: 'row-reverse', borderRadius: 16, padding: 20, alignItems: 'center', justifyContent: 'space-between', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 5, marginBottom: 20 },
  wideCardContent: { flex: 1, alignItems: 'flex-end', marginLeft: 15 },
  wideCardTitle: { fontSize: 16, fontWeight: '900', color: '#FFFFFF', marginBottom: 6, textAlign: 'right' },
  wideCardDesc: { fontSize: 12, color: '#CBD5E1', textAlign: 'right', lineHeight: 18 },
  wideCardIcon: { backgroundColor: 'rgba(255, 255, 255, 0.1)', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center' },
  bottomSpacer: { height: 100 },
});