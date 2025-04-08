import { Link, router } from "expo-router";
import {  Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from 'react'
import { auth, firebase_db } from "@/lib/firebase";
import { signInWithEmailAndPassword, User } from "firebase/auth";

export function LoginView() {
  /* Definimos el correo con un valor inicial en el estado que esta en el correo para que el usuario solo ponga iniciar y pueda entrar al contenido */
  const [email, setEmail] = useState('ironigevening@gmail.com')
    /* Definimos el correo con un valor inicial en el estado que esta en el correo para que el usuario solo ponga iniciar y pueda entrar al contenido */
  const [password, setPassword] = useState('12345678')
  const [loading, setLoading] = useState(false)

  /* Función para iniciar sesión */
  async function signInWithEmail() {
    try {
      /* cambiamos el estado a True para deshabilitar el botón */
      setLoading(true)
      /* Mnadamos las credenciales para saber si existe el usuario en la base de datos */
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      /* Asignamos la respuesta en el apartado user */
      const user = userCredential.user;

      /* Verificamos que exista el usuario */
      if (!user) {
        Alert.alert("Error", "No se pudo autenticar el usuario.");
        return;
      }
      /* Permitimos el acceso si no hay errores */
      //Alert.alert("Datos correctos, bienvenido")
      setEmail("");
      setPassword("");
      /* vamos a la vista que tengamos en la raíz */
      router.replace("/")

    } catch (error) {
      console.log(`Error ${error}`);
      Alert.alert("Error", "Correo o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  }

  return (
    /* Imagen que funciona como fondo */
    <ImageBackground style={styles.content} resizeMode="cover" source={require("../../assets/images/fondoIniSes.jpeg")}>
      <View style={styles.cajaIni}>
        <View style={styles.spaceContent}>
          <View style={styles.apartado}>
            <Text style={styles.label}>Correo:</Text>
            {/* Input que recibe el correo */}
            <TextInput
              //label="Email"
              //leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              style={styles.input}
              onChangeText={(text) => setEmail(text)}
              value={email}
              placeholder="email@address.com"
              autoCapitalize={'none'}
            />
          </View>
          <View style={styles.apartado}>
            <Text style={styles.label}>Contraseña:</Text>
            {/* Input que recibe la contraseña */}
            <TextInput
              //label="Password"
              //leftIcon={{ type: 'font-awesome', name: 'lock' }}
              style={styles.input}
              onChangeText={(text) => setPassword(text)}
              value={password}
              secureTextEntry={true}
              placeholder="Password"
              autoCapitalize={'none'}
            />
          </View>
        </View>
        <View style={styles.apartado}>
          {/* Botón para iniciar sesión que dependera del valor de loading para habilitarse o no */}
          <TouchableOpacity style={styles.botonIniSes} disabled={loading} onPress={() => signInWithEmail()}>
            <Text style={styles.botonText} >Iniciar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  cajaIni: {
    width: "70%",
    height: "60%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 50,
  },
  input: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 16,
    padding: 4,
    paddingLeft: 7,
    width: "100%",
    height: 45,
    color: "black",
    backgroundColor: "rgba(216, 223, 255, 0.64)"
  },
  spaceContent: {
    gap: 20,
    width: "80%",
  },
  apartado: {
    gap: 7,
    flexDirection: "column"
  },
  label: {
    fontSize: 18,
    fontFamily: "monospace",
    color: "white"
  },
  botonIniSes: {
    width: 200,
    height: 50,
    backgroundColor: "white",
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  botonText: {
    fontSize: 16,
    fontFamily: "monospace"
  },
});

