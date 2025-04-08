import { auth, firebase_db } from "@/lib/firebase";
import { collection, deleteDoc, doc, getDocs, limit, onSnapshot, query } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
/* import MapView, { Camera, Marker } from "react-native-maps"; */
import { onAuthStateChanged } from "firebase/auth";
import { LogType } from "./entities/log";
import { Timestamp } from "firebase/firestore";

export function StepsView() {

  //para poder acceder a la instancia del mapa
  const mapRef = useRef(null)

  //Asignamos a un arreglo el type que creaamos, importamos y iniciamos vacio
  const [marks, setMarks] = useState<LogType[]>([]);

  // Obtener datos de la base de datos de firestore
  const getLocations = (uid: string) => {
    try {
      //obtendremos los datos de la colección "locations"
      //importamos la inicialización de firebase con "firebase_db"
      //hacemos la consulta con "query", solo mostrando 15 registros
      const q = query(collection(firebase_db, "locations"), limit(15));
      //cada que cambie la colleción tendremos los registros
      return onSnapshot(q, (querySnapshot) => {
        //records es de tipo Logtype porque es la la estructura de nuestro type/modelo
        //para los datos que obtenemos
        //le asignamos a records todos los registros que obtengamos
        const records: LogType[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const latitude = parseFloat(data.latitude);
          const longitude = parseFloat(data.longitude);

          // Convertir Timestamp a Date
          // No me dejaba mostrar los datos por ello se tuvo que convertir el dato
          const fechaFirebase = data.fecha as Timestamp; 
          const date = fechaFirebase.toDate();

          return {
            //retornamos los datos por separado
            id: doc.id,
            latitude: latitude,
            longitude: longitude,
            date: date, 
          };
        });
        // console.log(records)
        // console.log("Datos: ", records); // <-- Verifica los datos
        //actualizamos el valor de nuestro estado
        setMarks(records);
      });
    } catch (error) {
      //mensaje de error
      console.error("Error al obtener registros:", error);
      //actualizamos a vacio nuestro estado
      setMarks([]);
    }
  };

  // Para borrar el documento/registro de la ubicación debemos de obtener su id
  const borrarDocumento = async (documentId: string) => {
    try {
      // Usaremos firestore(firebase_db), ubicamos la colección(locations) y pasamos el id
      const documentRef = doc(firebase_db, "locations", documentId);
      await deleteDoc(documentRef);
      setMarks(marks.filter((item) => item.id !== documentId));
      Alert.alert("Documento borrado correctamente!");
    } catch (error) {
      console.error("Error al borrar el documento:", error);
    }
  }

  //centrar el mapa cuando se lee la ubicación
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      //console.log("Usuario autenticado:", user); // <-- Verifica el usuario
      if (user) {
        getLocations(user.uid);
      } else {
        setMarks([]);
        Alert.alert("No hay un usuario autenticado");
      }
    });

    return () => unsubscribeAuth(); // Desuscribirse cuando el componente se desmonta
  }, []);

  // Formato para mostrar los registros de la firestore
  // se dara el mismo formato por registros  
  const renderLogs = ({ item }: { item: LogType }) => (
    <TouchableOpacity
      style={styles.row}
      onLongPress={() => borrarDocumento(item.id)}
    >
      <Text style={styles.cell}>{item.date.toString()}</Text>
      <Text style={styles.cell}>{item.latitude || "Desconocido"}</Text>
      <Text style={styles.cell}>{item.longitude || "Desconocido"}</Text>
    </TouchableOpacity>
  );


  return (
    <View style={styles.margen}>
      <Text style={styles.title}>Historial</Text>
      <View style={styles.container}>
        {/* Encabezado para identificar los datos en la tabla(tabla) */}
        <View style={styles.row}>
          <Text style={[styles.cell, styles.header]}>Fecha</Text>
          <Text style={[styles.cell, styles.header]}>Latitud</Text>
          <Text style={[styles.cell, styles.header]}>Longitud</Text>
        </View>

        {/* Obtener los registros con el formato de renderLogs */}
        <FlatList
          data={marks}
          renderItem={renderLogs}
          keyExtractor={(item) => item.id}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  margen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    paddingBottom: 100,
    padding: 5,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    backgroundColor: "rgb(217, 246, 253)",
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    flex: 1,
    padding: 8,
    textAlign: "center",
  },
  header: {
    fontWeight: "bold",
    backgroundColor: "#f1f1f1",
  },
  container: {
    margin: 10,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 12,
    overflow: "hidden",
    width: "95%",
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 5,
    paddingTop: 0,
    color: "white",
  },
});
