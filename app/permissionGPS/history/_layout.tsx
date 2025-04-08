import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    /* Barra inferior de Tab para la navegación */
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      {/* Vista donde mostramos las ubicaciones del usuario registradas en firebase */}
      <Tabs.Screen
        //Nombre del archivo
        name="index"
        options={{
          title: 'Ubicaciones',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="location-sharp" color={color} />,
        }}
      />
      {/* Vista donde mostramos el historial de ubicaciones del 
      usuario registradas en firebase en forma de tabla */}
      <Tabs.Screen
        //Nombre del archivo
        name="explore"
        options={{
          title: 'Historial',
          tabBarIcon: ({ color }) => <Ionicons size={28} name="book" color={color} />,
        }}
      />
    </Tabs>
  );
}
