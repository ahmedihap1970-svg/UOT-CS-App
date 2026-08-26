import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

// 1. استدعاءات الإشعارات
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

// 2. الاستدعاءات الناقصة (تمت إضافتها لحل الخطأ)
import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

// 3. إعدادات ظهور الإشعار
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // 4. كود التشغيل (يخفي الأزرار + يسجل الإشعارات ويرفعها للفايربيس)
  useEffect(() => {
    // إخفاء أزرار النظام
    NavigationBar.setVisibilityAsync("hidden");
    NavigationBar.setBehaviorAsync("overlay-swipe");

    async function registerForPushNotificationsAsync() {
      let token;
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          console.log('فشل الحصول على صلاحية الإشعارات!');
          return;
        }
        
        // جلب التوكن الخاص بجهازك
        token = (await Notifications.getExpoPushTokenAsync({
          projectId: '5d29344a-04cc-4ae7-ada1-afb46c5fc3df' 
        })).data;
        
        console.log("🔑 توكن الإشعارات:", token);

        // حفظ التوكن في فايربيس
        const safeTokenKey = token.replace(/[^a-zA-Z0-9]/g, ''); 
        try {
          await fetch(`https://universitynewsapp-83f24-default-rtdb.firebaseio.com/tokens/${safeTokenKey}.json`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: token })
          });
          console.log("✅ تم حفظ التوكن بنجاح في الفايربيس");
        } catch (error) {
          console.log("❌ خطأ في حفظ التوكن:", error);
        }

      } else {
        console.log('يجب استخدام جهاز حقيقي لتجربة الإشعارات');
      }
    }

    registerForPushNotificationsAsync();
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}