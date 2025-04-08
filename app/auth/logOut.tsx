import { auth } from "@/lib/firebase";
import { router } from "expo-router";
import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { Alert } from "react-native";

export default function LogOut () {
  useEffect(() => {
    const logout = async () => {
        try {
            await signOut(auth);
            Alert.alert("Sesión cerrada");
            router.replace("/auth/login"); // Redirige a la pantalla de login
        } catch (error) {
            console.error("Error al cerrar sesión", error);
        }
    };
    logout(); // Ejecuta el cierre de sesión al montar el componente
}, []);

}