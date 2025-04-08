import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Character } from "./characterType";
import { CharacterCard } from "./characterCard";
import { useEffect, useState } from "react";
import { CharactersResult } from "./charactersResult";
import { DataSource } from "./dataSource";
/*  */
export function CharactersView() {
  //definir el estado 
  const [loading, setLoading] = useState(false);

  //constante de estado que nos indica en que valor/pagina
  //de la api iniciara nuestra app
  const [page, setPage] = useState(1)

  //asignamos a una constante de estado nuestro type de CharactersResult
  const [data, setData] = useState<CharactersResult>({
    info: {
      pages: 0,
      count: 0,
      next: null,
      prev: null,
    },
    results: [],
  });

  //asignamos a una constante lo que tiene nuestro clase DataSource 
  const dataSource = new DataSource();

  /* useEffect que reacciona cuando cambia el valor del estado page */
  useEffect(() => {
    setLoading(true); //esta cargando
    /* ejecuta la función getCharacters para obtener los personajes 
    de la página que se manda */
    dataSource.getCharacters(page)
      .then((response) => {
        setData(response)
      })
      .catch((error) => {
        Alert.alert(`Error: ${error.message}`);
      })
      .finally(() => {
        setLoading(false); //ya no esta cargando
      })
  }, [page]);

  return (
    /* SafeAreaView que funciona como un ScrollView */
    <SafeAreaView style={styles.content}>
      <View style={styles.barra}>
        {/* Botón que tiene la función para regresar de página siempre 
        siempre y cuando la propiedad prev no sea null, en caso de serlo deshabilita el botón */}
        <TouchableOpacity
          style={[
            styles.button,
            styles.prev,
            data.info.prev === null
              ? styles.disabled : undefined
          ]}
          /* Al presionar el botón resta en 1 al valor que tenga page */
          onPress={() => setPage(page - 1)}
          disabled={data.info.prev === null}
        >
          <Text>Anterior</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          {/* Dice en que página se encuentra y cuantas son las totales */}
          Página {page} de {data.info.pages}
        </Text>
        {/* Botón que tiene la función para avanzar de página siempre 
        siempre y cuando la propiedad next no sea null, en caso de serlo deshabilita el botón */}
        <TouchableOpacity
          style={[styles.button,
          styles.next,
          data.info.next === null
            ? styles.disabled : undefined
          ]}
          /* Al presionar el botón suma en 1 al valor que tenga page */
          onPress={() => setPage(page + 1)}
          disabled={data.info.next === null}
        >
          <Text>Siguiente</Text>
        </TouchableOpacity>
      </View>
      {/* Si está cargando muestra el indicador, sino, 
                no muestres nada */}
      {loading ? (
        <ActivityIndicator size={"large"} />
      ) : null}
      {/* {data.results.map((item) => (
                <CharacterCard
                    key={item.id}//identificar el componente cuando se pinte en la pantalla
                    character={item}
                />
            ))}  */}
      {/* El FlatList nos ayuda para mostrar tarjetas con la información de cada personaje */}
      <FlatList
        /* Le pasamos la estructura de data.result que tiene las propiedades de los personajes */
        data={data.results}
        renderItem={({ item }) => (
          <CharacterCard
            character={item}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  content: {
    padding: 8,
    width: "100%",
    height: "100%",
    paddingBottom: 9,
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
    color:"white",
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