import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Estilos del Drawer y sus secciones */}
      <Drawer
        screenOptions={{
          drawerStyle: { backgroundColor: '#1E1E1E' },
          drawerLabelStyle: { color: 'white' },
          drawerActiveTintColor: '#FFA500',
          drawerInactiveTintColor: '#FFFFFF',
          headerStyle: { backgroundColor: '#222222' },
          headerTintColor: 'white',
        }}>
        {/* Apartado de la vista inicial(va en la parte superior para tener una buena secuencia) */}
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: 'Inicio',
            title: 'Inicio',
            drawerIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />
        {/* Apartado de la vista de personajes */}
        <Drawer.Screen
          name="(characters)"
          options={{
            drawerLabel: 'Personajes',
            title: 'Personajes',
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons size={28} name="account-group" color={color} />
            ),
          }}
        />
        {/* Apartado de la vista de episodios */}
        <Drawer.Screen
          name="(episodes)"
          options={{
            drawerLabel: 'Episodios',
            title: 'Episodios',
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons size={28} name="filmstrip" color={color} />
            ),
          }}
        />
        {/* Apartado de la vista de ubicaciones */}
        <Drawer.Screen
          name="(locations)"
          options={{
            drawerLabel: 'Ubicaciones',
            title: 'Ubicaciones',
            drawerIcon: ({ color }) => (
              <MaterialCommunityIcons size={28} name="map-marker" color={color} />
            ),
          }}
        />
        {/* Apartado del archivo que se muestra en caso de no encontrar una pantalla */}
        <Drawer.Screen
          name="+not-found"
          options={{
            drawerItemStyle: { display: 'none' },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
} 
