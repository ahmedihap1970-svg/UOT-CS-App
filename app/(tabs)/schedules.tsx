import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import Theme from '../../constants/theme';

type Department = 'الشبكات وإدارة الويب' | 'البرمجيات' | 'نظم المعلومات' | 'الذكاء الاصطناعي';
type Stage = 'المرحلة الأولى' | 'المرحلة الثانية' | 'المرحلة الثالثة' | 'المرحلة الرابعة';
type Day = 'الأحد' | 'الإثنين' | 'الثلاثاء' | 'الأربعاء' | 'الخميس';

type ScheduleItem = {
  id: string;
  department: Department;
  stage: Stage;
  day: Day;
  subject: string;
  time: string; 
  hall: string; 
  isLab: boolean;
  professor: string;
};

const DEPARTMENTS: Department[] = [
  'الشبكات وإدارة الويب',
  'البرمجيات',
  'نظم المعلومات',
  'الذكاء الاصطناعي',
];

const STAGES: Stage[] = [
  'المرحلة الأولى',
  'المرحلة الثانية',
  'المرحلة الثالثة',
  'المرحلة الرابعة',
];

const DAYS: { id: Day; icon: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'الأحد', icon: 'calendar-outline' },
  { id: 'الإثنين', icon: 'calendar-outline' },
  { id: 'الثلاثاء', icon: 'calendar-outline' },
  { id: 'الأربعاء', icon: 'calendar-outline' },
  { id: 'الخميس', icon: 'calendar-outline' },
];

const SUBJECT_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  default: 'book-outline',
  network: 'git-network-outline',
  web: 'globe-outline',
  code: 'code-slash-outline',
  data: 'server-outline',
  ai: 'hardware-chip-outline',
};

const getSubjectIcon = (subject: string): keyof typeof Ionicons.glyphMap => {
  if (subject.includes('شبكات')) return SUBJECT_ICONS.network;
  if (subject.includes('ويب')) return SUBJECT_ICONS.web;
  if (subject.includes('برمجة') || subject.includes('هندسة')) return SUBJECT_ICONS.code;
  if (subject.includes('قواعد') || subject.includes('نظم')) return SUBJECT_ICONS.data;
  if (subject.includes('ذكاء')) return SUBJECT_ICONS.ai;
  return SUBJECT_ICONS.default;
};

/* --- البيانات الوهمية (Mock Data) للتجربة --- */
const MOCK_SCHEDULE: ScheduleItem[] = [
  {
    id: 'n3-1', department: 'الشبكات وإدارة الويب', stage: 'المرحلة الثالثة', day: 'الأحد',
    subject: 'شبكات الحاسوب (1)', time: '09:00 - 10:30', hall: 'قاعة 12', isLab: false,
    professor: 'د. أحمد الخفاجي',
  },
  {
    id: 'n3-2', department: 'الشبكات وإدارة الويب', stage: 'المرحلة الثالثة', day: 'الأحد',
    subject: 'إدارة خوادم الويب — مختبر', time: '10:45 - 12:15', hall: 'مختبر الشبكات 2', isLab: true,
    professor: 'م. م. سارة العبيدي',
  },
  {
    id: 'n3-3', department: 'الشبكات وإدارة الويب', stage: 'المرحلة الثالثة', day: 'الثلاثاء',
    subject: 'أمن المعلومات', time: '11:00 - 12:30', hall: 'قاعة 8', isLab: false,
    professor: 'د. مصطفى الجبوري',
  },
  {
    id: 's2-1', department: 'البرمجيات', stage: 'المرحلة الثانية', day: 'الإثنين',
    subject: 'برمجة كائنية التوجه', time: '08:30 - 10:00', hall: 'قاعة 5', isLab: false,
    professor: 'د. ليلى النعيمي',
  },
  {
    id: 's2-2', department: 'البرمجيات', stage: 'المرحلة الثانية', day: 'الإثنين',
    subject: 'هندسة البرمجيات — مختبر', time: '10:15 - 11:45', hall: 'مختبر البرمجة 1', isLab: true,
    professor: 'م. عمر حسن',
  },
  {
    id: 'i1-1', department: 'نظم المعلومات', stage: 'المرحلة الأولى', day: 'الأحد',
    subject: 'مقدمة في نظم المعلومات', time: '08:00 - 09:30', hall: 'قاعة الكلية الكبرى', isLab: false,
    professor: 'أ.د. رغد السامرائي',
  },
];

export default function SchedulesScreen() {
  const [activeDepartment, setActiveDepartment] = useState<Department>('الشبكات وإدارة الويب');
  const [activeStage, setActiveStage] = useState<Stage>('المرحلة الثالثة');
  const [activeDay, setActiveDay] = useState<Day>('الأحد');

  const filteredSchedule = useMemo(
    () =>
      MOCK_SCHEDULE.filter(
        (item) =>
          item.department === activeDepartment &&
          item.stage === activeStage &&
          item.day === activeDay,
      ),
    [activeDepartment, activeStage, activeDay],
  );

  const renderChips = <T extends string>(
    items: T[],
    activeValue: T,
    onSelect: (value: T) => void,
  ) => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.chipRow}
       
    >
      {items.map((item) => {
        const isActive = item === activeValue;
        return (
          <TouchableOpacity
            key={item}
            style={[styles.chip, isActive && styles.chipActive]}
            activeOpacity={0.8}
            onPress={() => onSelect(item)}
          >
            <Text style={[styles.chipText, isActive && styles.chipTextActive]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const renderDays = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.dayRow}
      
    >
      {DAYS.map((day) => {
        const isActive = day.id === activeDay;
        return (
          <TouchableOpacity
            key={day.id}
            style={[styles.dayChip, isActive && styles.dayChipActive]}
            activeOpacity={0.8}
            onPress={() => setActiveDay(day.id)}
          >
            <Ionicons
              name={day.icon}
              size={16}
              color={isActive ? '#FFFFFF' : Theme.Colors.text.secondary}
            />
            <Text style={[styles.dayChipText, isActive && styles.chipTextActive]}>
              {day.id}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );

  const renderCard = ({ item }: { item: ScheduleItem }) => (
    <View style={[styles.card, item.isLab && styles.cardLab]}>
      <View style={styles.cardTopRow}>
        <View style={[styles.subjectIconWrap, item.isLab && styles.subjectIconLab]}>
          <Ionicons
            name={getSubjectIcon(item.subject)}
            size={20}
            color={item.isLab ? Theme.Colors.success : Theme.Colors.primary}
          />
        </View>

        <View style={styles.subjectInfo}>
          <Text style={[Theme.TextStyles.h3, styles.subjectName]} numberOfLines={2}>
            {item.subject}
          </Text>
          {item.isLab && (
            <View style={styles.labBadge}>
              <Ionicons name="flask-outline" size={12} color="#FFFFFF" />
              <Text style={styles.labBadgeText}>مختبر</Text>
            </View>
          )}
        </View>
      </View>

      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Ionicons name="time-outline" size={16} color={Theme.Colors.text.secondary} />
          <Text style={[Theme.TextStyles.body, styles.detailText]}>{item.time}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="business-outline" size={16} color={Theme.Colors.text.secondary} />
          <Text style={[Theme.TextStyles.body, styles.detailText]}>{item.hall}</Text>
        </View>

        <View style={styles.detailRow}>
          <Ionicons name="person-circle-outline" size={16} color={Theme.Colors.text.secondary} />
          <Text style={[Theme.TextStyles.body, styles.detailText]}>{item.professor}</Text>
        </View>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.centered}>
      <View style={styles.emptyIconWrap}>
        <Ionicons name="calendar-clear-outline" size={56} color={Theme.Colors.primary} />
      </View>
      <Text style={[Theme.TextStyles.h3, styles.emptyTitle]}>
        لا توجد محاضرات لهذا اليوم
      </Text>
      <Text style={[Theme.TextStyles.body, styles.emptySubtitle]}>
        جرّب اختيار يوم أو مرحلة دراسية أخرى.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={[Theme.TextStyles.h1, styles.headerTitle]}>الجداول الدراسية</Text>
        <View style={styles.headerUnderline} />
      </View>

      <View style={styles.section}>
        <Text style={[Theme.TextStyles.caption, styles.sectionLabel]}>
          <Ionicons name="school-outline" size={13} color={Theme.Colors.primary} /> القسم
        </Text>
        {renderChips(DEPARTMENTS, activeDepartment, setActiveDepartment)}
      </View>

      <View style={styles.section}>
        <Text style={[Theme.TextStyles.caption, styles.sectionLabel]}>
          <Ionicons name="layers-outline" size={13} color={Theme.Colors.primary} /> المرحلة
        </Text>
        {renderChips(STAGES, activeStage, setActiveStage)}
      </View>

      <View style={styles.section}>{renderDays()}</View>

      <FlatList
        data={filteredSchedule}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={
          filteredSchedule.length === 0 ? styles.listEmpty : styles.listContent
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Theme.Colors.background,
  },
  header: {
    paddingHorizontal: Theme.Spacing.lg,
    paddingTop: Theme.Spacing.md,
    paddingBottom: Theme.Spacing.sm,
  },
  headerTitle: {
    color: Theme.Colors.text.primary,
    textAlign: 'right',
  },
  headerUnderline: {
    width: 56,
    height: 4,
    borderRadius: Theme.Spacing.xs,
    backgroundColor: Theme.Colors.accent,
    marginTop: Theme.Spacing.xs + 2,
    alignSelf: 'flex-end',
  },
  section: {
    marginTop: Theme.Spacing.sm,
  },
  sectionLabel: {
    color: Theme.Colors.text.secondary,
    paddingHorizontal: Theme.Spacing.lg,
    marginBottom: Theme.Spacing.xs,
    textAlign: 'right',
  },
 chipRow: {
    paddingHorizontal: Theme.Spacing.lg,
    gap: Theme.Spacing.sm,
    paddingVertical: Theme.Spacing.xs,
    flexDirection: 'row-reverse', // ضفنا هذا السطر لعكس الاتجاه
  },
  chip: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: Theme.Colors.surface,
    borderRadius: Theme.BorderRadius.pill,
    paddingVertical: Theme.Spacing.xs + 4,
    paddingHorizontal: Theme.Spacing.md,
    borderWidth: 1,
    borderColor: 'transparent',
    ...Theme.Shadows.sm,
  },
  chipActive: {
    backgroundColor: Theme.Colors.primary,
  },
  chipText: {
    color: Theme.Colors.text.primary,
    textAlign: 'right',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  dayRow: {
    paddingHorizontal: Theme.Spacing.lg,
    gap: Theme.Spacing.sm,
    paddingVertical: Theme.Spacing.xs,
    flexDirection: 'row-reverse', // ضفنا هذا السطر لعكس الاتجاه
  },
  dayChip: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.Colors.surface,
    borderRadius: Theme.BorderRadius.md,
    paddingVertical: Theme.Spacing.sm,
    minWidth: 84,
    gap: Theme.Spacing.xs,
    borderWidth: 1,
    borderColor: 'transparent',
    ...Theme.Shadows.sm,
  },
  dayChipActive: {
    backgroundColor: Theme.Colors.primary,
  },
  dayChipText: {
    color: Theme.Colors.text.primary,
  },
  listContent: {
    padding: Theme.Spacing.lg,
    paddingBottom: 100, 
    gap: Theme.Spacing.md,
  },
  listEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: Theme.Colors.surface,
    borderRadius: Theme.BorderRadius.md,
    padding: Theme.Spacing.lg,
    borderRightWidth: 4,
    borderRightColor: Theme.Colors.primary,
    ...Theme.Shadows.md,
  },
  cardLab: {
    borderRightColor: Theme.Colors.success,
  },
  cardTopRow: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    gap: Theme.Spacing.md,
    marginBottom: Theme.Spacing.sm,
  },
  subjectIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Theme.BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.Colors.background,
  },
  subjectIconLab: {
    backgroundColor: Theme.Colors.background,
  },
  subjectInfo: {
    flex: 1,
    alignItems: 'flex-end',
    gap: Theme.Spacing.xs,
  },
  subjectName: {
    color: Theme.Colors.text.primary,
    textAlign: 'right',
  },
  labBadge: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Theme.Spacing.xs,
    backgroundColor: Theme.Colors.success,
    borderRadius: Theme.BorderRadius.sm,
    paddingVertical: 2,
    paddingHorizontal: Theme.Spacing.sm,
  },
  labBadgeText: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  details: {
    gap: Theme.Spacing.xs + 2,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Theme.Colors.border,
    paddingTop: Theme.Spacing.sm,
  },
  detailRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    gap: Theme.Spacing.sm,
  },
  detailText: {
    color: Theme.Colors.text.secondary,
    textAlign: 'right',
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.Spacing.xl,
    gap: Theme.Spacing.sm,
  },
  emptyIconWrap: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Theme.Colors.surface,
    marginBottom: Theme.Spacing.xs,
    ...Theme.Shadows.md,
  },
  emptyTitle: {
    color: Theme.Colors.text.primary,
    textAlign: 'center',
  },
  emptySubtitle: {
    color: Theme.Colors.text.secondary,
    textAlign: 'center',
  },
});