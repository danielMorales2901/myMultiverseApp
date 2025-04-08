import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        {/* Dado que le cambiamos el nombre a la carpeta debemos de poner su nombre aqui */}
        <Stack.Screen name="/history" options={{ headerShown: false }} />
        {/* Llamada para la vista de index del archivo de la carpeta de permissionGPS,
        que es la vista principal del proyecto */}
        <Stack.Screen
          name="index"
          options={{
            /* Nombre con el que queremos que se vea */
            title: "Ubicación",
            headerShown: false
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
