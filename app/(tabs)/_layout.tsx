import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet } from 'react-native';
import Theme from '../../constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Theme.Colors.accent,
        tabBarInactiveTintColor: Theme.Colors.text.muted,
        tabBarStyle: {
          backgroundColor: Theme.Colors.surface,
          height: Platform.OS === 'ios' ? 88 : 64,
          borderTopWidth: StyleSheet.hairlineWidth,
          borderTopColor: Theme.Colors.border,
          ...Theme.Shadows.md,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontFamily: Theme.Typography.fonts.semiBold,
          fontSize: 10, // صغرنا الخط شوية لأن صارن 5 أزرار
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'الرئيسية',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="activities"
        options={{
          title: 'النشاطات',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'flask' : 'flask-outline'} size={size} color={color} />
          ),
        }}
      />
      
      {/* القسم الجديد: الطلاب */}
      <Tabs.Screen
        name="students"
        options={{
          title: 'الطلاب',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'school' : 'school-outline'} size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="news"
        options={{
          title: 'الأخبار',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'newspaper' : 'newspaper-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedules"
        options={{
          title: 'الجداول',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'calendar' : 'calendar-outline'} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}