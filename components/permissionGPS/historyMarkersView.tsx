import { firebase_db } from "@/lib/firebase";
import { router } from "expo-router";
import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Camera, Marker } from "react-native-maps";
import { LogType } from "./entities/log";

export function HistoryMarkersView() {

  //para poder acceder a la instancia del mapa
  const mapRef = useRef(null)

  //Asignamos a un arreglo el type que creaamos, importamos y iniciamos vacio
  const [marks, setMarks] = useState<LogType[]>([]);

  // Obtener datos de nuestra base de datos de firestore
  const getLocations = () => {
    try {
      //obtendremos los datos de la colección "locations"
      //importamos la inicialización de firebase con "firebase_db"
      //hacemos la consulta con "query"
      const q = query(collection(firebase_db, "locations"));
      //cada que cambie la colleción tendremos los registros
      return onSnapshot(q, (querySnapshot) => {
        //records es de tipo Logtype porque es la la estructura de nuestro type/modelo
        //para los datos que obtenemos
        //le asignamos a records todos los registros que obtengamos
        const records: LogType[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const latitude = parseFloat(data.latitude);
          const longitude = parseFloat(data.longitude);

          return {
            //retornamos los datos por separado
            id: doc.id,
            latitude: latitude,
            longitude: longitude,
            date: data.fecha,
          };
        });

        // console.log("Datos: ", records); // <-- Verifica los datos
        //actualizamos el valor de nuestro estado
        setMarks(records);
      });
    } catch (error) {
      //mensaje de error
      console.error("Error al obtener registros:", error);
      //actualizamos a vacio nuestro estado
      setMarks([]);
      // Retorna una función vacía para evitar errores
      return () => {}; 
    }
  };

  // Centrar el mapa cuando se lee la ubicación y estara al pediente por si nuestro 
  // estado de marks cambia
  useEffect(() => {
    async function showLocation() {
      // Que no haga nada si no hay locaización o si 
      // no hay mapRef o si no hay nada en nuestro arreglo
      if (!marks || marks.length === 0 || !mapRef.current) return;

      //esperamos a que tengamos acceso al mapa
      const camera = await (mapRef.current as any)?.getCamera() as Camera;
      // Centramos al mapa con la posicion de nuestra 
      // latitude y longitud de la posición cero de nuestro arreglo
      camera.center = {
        latitude: marks[0].latitude,
        longitude: marks[0].longitude,
      }
      camera.zoom = 10;
      (mapRef.current as any)?.animateCamera(camera, { duration: 1000 })
    }
    //llamos a la función
    showLocation();
  }, [marks]);

  // Llamar a getLocations al montar el componente
  useEffect(() => {
    const unsubscribe = getLocations();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View style={styles.margen}>
      <MapView
        ref={mapRef}
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
        style={styles.map}>
        {marks.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            pinColor="red"
            title="Marca"
            description={`Lat: ${location.latitude}, Lon: ${location.longitude}`}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  margen: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
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
