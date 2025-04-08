import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { SplashScreen, Stack, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
SplashScreen.preventAutoHideAsync();
export default function Layout() {
  /* Instanciamos router para poder movernos entre pantallas cuando se inicie sesión */
  const router = useRouter();
  /* Instanciamos user para saber las propiedades que tiene un usuario */
  const [user, setUser] = useState<User | null>(null);
  /* Si aun no termina de cargar la app se muestra una vista */
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
  });
  // Monitorear el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      setUser(userData);
    });
    return unsubscribe;
  }, []);
  // Ocultar el SplashScreen cuando las fuentes estén cargadas
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  // Redirigir al login si no hay usuario
  useEffect(() => {
    if (loaded && !user) {
      router.replace("/auth/login");
    }
  }, [loaded, user]);
  if (!loaded) {
    return null;
  }
  // Si no hay usuario, devolver solo un Stack sin el Drawer
  if (!user) {
    return (
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#222222' },
          headerTintColor: 'white',
        }}
      >
        {/* Solo mostrara esta vista para que no se pueda mover entre la app el usuario */}
        <Stack.Screen name="auth/login" options={{ title: "Inicio de sesión" }} />
      </Stack>
    );
  } return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* Estilos que tiene el Drawer */}
      <Drawer
        screenOptions={{
          drawerStyle: { backgroundColor: '#1E1E1E' },
          drawerLabelStyle: { color: 'white' },
          drawerActiveTintColor: '#FFA500',
          drawerInactiveTintColor: '#FFFFFF',
          headerStyle: { backgroundColor: '#222222' },
          headerTintColor: 'white',
        }}
      >
        {/* Apartado para la vista inicial */}
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
        {/* Apartado para el proyecto de Rick and Morty */}
        <Drawer.Screen
          name="rickAndMorty"
          options={{
            drawerLabel: 'Rick and Morty',
            title: 'Rick and Morty',
            drawerIcon: ({ color }) => (
              <Ionicons size={28} name="images" color={color} />
            ),
          }}
        />
        {/* Apartado para el proyecto de Notes */}
        <Drawer.Screen
          name="notes/index"
          options={{
            drawerLabel: 'Notas',
            title: 'Notas',
            drawerIcon: ({ color }) => (
              <Ionicons size={28} name="create" color={color} />
            ),
          }}
        />
        {/* Apartado para el proyecto de Permisos */}
        <Drawer.Screen
          name="permissions/index"
          options={{
            drawerLabel: 'Permisos',
            title: 'Permisos',
            drawerIcon: ({ color }) => (
              <Ionicons size={28} name="alert-circle-outline" color={color} />
            ),
          }}
        />
        {/* Apartado para el proyecto de Cámara y Galería */}
        <Drawer.Screen
          name="cameraGallery/index"
          options={{
            drawerLabel: 'Cámara',
            title: 'Cámara',
            drawerIcon: ({ color }) => (
              <Ionicons size={28} name="camera" color={color} />
            ),
          }}
        />
        {/* Apartado para el proyecto de GPS */}
        <Drawer.Screen
          name="permissionGPS"
          options={{
            drawerLabel: 'GPS',
            title: 'GPS',
            drawerIcon: ({ color }) => (
              <Ionicons size={28} name="location-outline" color={color} />
            ),
          }}
        />
        {/* Apartado de Información */}
        <Drawer.Screen
          name="info/index"
          options={{
            drawerLabel: 'Acerca de',
            title: 'Acerca de',
            drawerIcon: ({ color }) => (
              <Ionicons size={28} name="information-circle-outline" color={color} />
            ),
          }}
        />
        {/* Apartado para cerrar sesión */}
        <Drawer.Screen
          name="auth/logOut"
          options={{
            drawerLabel: 'Cerrar sesión',
            title: 'Cerrar sesión',
            drawerIcon: ({ color }) => (
              <Ionicons size={28} name="exit-outline" color={color} />
            ),
          }}
        />
        {/* Apartado para el log in aunque decimos que no se muestre en el Drawer */}
        <Drawer.Screen
          name="auth/login"
          options={{
            drawerItemStyle: { display: 'none' }, title: "Iniciar sesión"
          }}
        />
        {/* Apartado mostrar la vista cuando no se encuentre una vista, pero no la mostramos */}
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

