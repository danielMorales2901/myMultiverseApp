import { ActivityIndicator, Alert, Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { CharacterCard } from "./characterCard";
import { useEffect, useRef, useState } from "react";
import { CharactersResult } from "./charactersResult";
import { DataSource } from "./dataSource";
/* Este archivo es la vista que nos permite desplazarnos de manera infinita en la app, lo que siginifica
que consumira todas las páginas disponibles en la api mientras el usuario siga deslizando */
export function CharactersScrollView() {
  //definir el estado 
  const [loading, setLoading] = useState(false);
  /* la página comienza en la 1 de la api */
  const [page, setPage] = useState(1)
  /* data contiene la estructura de los campos a los que podemos acceder */
  const [data, setData] = useState<CharactersResult>({
    info: {
      pages: 0,
      count: 0,
      next: null,
      prev: null,
    },
    results: [],
  });
  //refrerencia para el flatlist
  const flatlistRef = useRef(null);
  //instancia del datasource
  const dataSource = new DataSource();
  //función para disparar la carga
  const handleEndRached = () => {
    //si hay página siguiente y
    //no esta cargando, entonces incrementar la pagina
    if (data.info.next && !loading) {
      setPage(page + 1);
    }
  }
  /* al abrir la página permanecemos atentos al cambio que tenga el estado de page, para
  realizar el cuerpo del useEffect */
  useEffect(() => {
    setLoading(true); //esta cargando
    /* Función para obtener los personajes de la página que diga la variable de estado page */
    dataSource.getCharacters(page)
      .then((response) => {
        //conservar los personajes ya cargados
        //reaccionar como valor el objeto que retorna la función de 
        //callback que debe unir todos los personajes
        setData((prevData) => ({
          results: [...prevData.results, ...response.results],
          info: response.info,
        }))
      })
      .catch((error) => {
        Alert.alert(`Error: ${error.message}`);
      })
      .finally(() => {
        setLoading(false); //ya no esta cargando
      })
  }, [page]);
  return (
    /* Utilizamos SafeAreaView para que permita al FlatList seguir mandando datos y la vista siga 
    creciendo sin problemas */
    <SafeAreaView style={styles.content}>
      <View style={styles.barra}>
        <Text style={styles.title}>
          Personajes {data.results.length} de {data.info.count}
        </Text>
      </View>
      <FlatList
        /* consumira como información la estructura que tiene el apartado data.results
        que son los campos disponibles para un personaje */
        data={data.results}
        /* Va a repetir la estructura del componente de tarejetas */
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
          />
        )}
        /* Su llave sera el id de cada personaje y se convierte a tipo string */
        keyExtractor={item => item.id.toString()}
        ref={flatlistRef}
        onEndReached={handleEndRached}
        onEndReachedThreshold={0.5}
        refreshing={loading}// es el porcentaje del final para que se mande a cargar contenido
        /* Muestra un circulo de carga si aun no cargan los siguientes personajes */
        ListFooterComponent={loading
          ? <ActivityIndicator size={"large"} />
          : undefined
        }  // si se deja en uno siempre se muestra el scroll de cargando
      />
      {/* Muestra un circulo de carga si la información aun no es cargada en la vista */}
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : null}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content: {
    padding: 8,
    width: "100%",
    height: "100%",
    paddingBottom: 13,
    backgroundColor: "rgb(39, 39, 39)"
  },
  barra: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    height: 70,
    backgroundColor: "rgb(112, 110, 114)",
    marginBottom: 7,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color:"white"
  },
  button: {
    width: "25%",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#000",
  },
  prev: {
    backgroundColor: "white"
  },

  next: {
    backgroundColor: "rgb(228, 228, 228)"
  },
  disabled: {
    opacity: 0.5,
  }
});