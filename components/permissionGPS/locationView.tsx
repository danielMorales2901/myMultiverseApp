//locationView.tsx
import { getCurrentPositionAsync, LocationObject, useForegroundPermissions } from "expo-location";
import { router } from "expo-router";
import { auth, firebase_db } from '@/lib/firebase'
import { useEffect, useRef, useState } from "react";
import { Alert, Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { addDoc, collection } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import MapView, { Camera, Marker } from "react-native-maps";

export function LocationView() {

  /* Estado para conocer si hay permiso del usuario para usar la ubicación */
  const [permission, requesPermission] = useForegroundPermissions();

  /* Estado que nos ayudara a guardar la ubicación actual del dispositivo del usuario */
  const [location, setLocation] = useState<LocationObject | null>(null);
  //console.log("Datos de location:", location);

  //para poder acceder a la instancia del mapa
  const mapRef = useRef(null)

  //centrar el mapa cuando se lee la ubicación
  useEffect(() => {
    async function showLocation() {
      //que no haga nada si no hay locaización o si no hay mapRef
      if (!location || !mapRef.current) return;

      /* Instaciamos la camara y la centramos dependiendo de los datos 
        que obtenga nuestro estado de location */
      const camera = await (mapRef.current as any)?.getCamera() as Camera;
      camera.center = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }
      camera.zoom = 15;
      (mapRef.current as any)?.animateCamera(camera, { duration: 1000 })
    }
    showLocation();
  }, [location]);

  const date = new Date();


  // Función asincrona que agrega los datos a nuestra colección de firestore
  async function agregarDatos(data : LocationObject) {
    //console.log(location)
    //Verificamos que se tenga una dirección, si no lo hay salimos de la función
/*     if (!location) {
      Alert.alert("Error:", "No se ha podido obtener la ubicación.");
      return;
    } */
    try {
      // Ubicamos la colección de firestore y le pasamos los datos que queremos agregar
      const docRef = await addDoc(collection(firebase_db, "locations"), {
        fecha: date,
        latitude: data.coords.latitude,
        longitude: data.coords.longitude,
      });
      //console.log(docRef);

      //Alert.alert("Documento agregado con ID: ", docRef.id);
    } catch (e) {
      //Alert.alert("Error al agregar documento: " + e);
      //console.log(e);
    }
  }


  // cada que cambie el valor de permission se arroja el useEffect
  useEffect(() => {
    //se hace una función porque no se puede 
    async function getCurrentLocation() {
      if (permission?.granted) {

        //espera que se tenga la ultima ubicación del dispositivo y la agregammos una constante
        const result = await getCurrentPositionAsync();
        //actualizar el valor del estado de ubicación con el nuevo
        setLocation(result);

        if (result) {
          agregarDatos(result);
        }
      }
    }
    getCurrentLocation();
  }, [permission]);


  // si no hay permiso, solicitarlo
  if (!permission?.granted) {
    return (
      <View style={styles.permission}>
        <Text style={styles.text}>Debes permitir el acceso a la ubicación</Text>
        <Button
          onPress={requesPermission}
          title="Permitir ubicación" />
      </View>
    );
  }

  // mostrar la ubicación en el mapa
  return (
    <View style={styles.margen}>
      {/* Componente para desplegar el mapa */}
      <MapView
        style={styles.map}
        ref={mapRef}
        /* Ubicación inicial del mapa */
        initialRegion={{
          latitude: 18.5955558,
          longitude: -98.4907685,
          latitudeDelta: 0.00005,
          longitudeDelta: 0.00005,
        }}
        initialCamera={{
          center: {
            latitude: 18.5955558,
            longitude: -98.4907685,
          },
          pitch: 45,
          heading: 90,
          altitude: 1000,
          zoom: 10,
        }}
      >

        {/* Si hay contenido en location extrae la información de los registros y las pasa a un marcador */}
        {location ? (
          <Marker
            coordinate={location?.coords}
            pinColor="green"
            title="Posición actual"
            description={`Lon: ${location.coords.longitude || ""}, Lat: ${location.coords.longitude || ""}`}
          />
        ) : null}
      </MapView>
      {/* Texto flotante */}
      <View style={styles.float}>
        <Text style={[styles.text, { textDecorationLine: "underline" }]}>Ubicación:</Text>
        <Text style={styles.text}>Longitud: {location?.coords.longitude}</Text>
        <Text style={styles.text}>Latitud: {location?.coords.latitude}</Text>
      </View>
      <View style={styles.button}>
        {/* Botón para cambiar de vista, en este caso a un par porque estan ligadas con un TabBar */}
        <TouchableOpacity
          onPress={() => router.push("/permissionGPS/history")}
        >
          <Text style={styles.text}>Historial</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  margen: {
    flex: 1,
  },
  permission: {
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    gap: 7,
    flex: 1
  },
  map: {
    width: '100%',
    height: '100%',
  },
  float: {
    left: "5%",
    top: 50,
    position: "absolute",
    padding: 5,
    backgroundColor: "transparent",
    borderRadius: 5
  },
  text: {
    fontFamily: "monospace",
    fontWeight: "800"
  },
  button: {
    top: "92%",
    left: "70%",
    position: "absolute",
    width: "auto",
    height: "auto",
    padding: 10,
    borderRadius: 16,
    borderWidth: 1.3,
    backgroundColor: "rgb(170, 218, 239)",
  },
});