//characterCard.tsx
/* 
Este archivo contiene la estructura de una tarjeta que muestra la información de los personajes
y tambien contiene un modal para realizar la misma acción solo que con toda la información disponible
del personaje 
*/
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Character } from "./characterType";
import { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
// tipo para especificar las propiedades de CharacterCard
type Props = {
  character: Character;
}
//Tarjeta de personaje
export function CharacterCard({ character }: Props) {
  /* Estado para que abra o cierre el modal */
  const [showModal, setShowModal] = useState(false);
  /* 
  Esta función que contiene un switch fue hecho para que cambie el 
  color de un circulo que ayuda a identificar el estado en el que se encuentra 
  el personaje, puede ser vivo, muerto o desconocido, por ende se asignan diferentes tipos 
  estilos a character.status
  */
  const getColorStatus = () => {
    switch (character.status) {
      case "Alive":
        return styles.alive
      case "Dead":
        return styles.dead
      case "unknown":
        return styles.unknown
      default:
        return styles.unknown
    }
  }
  //estructura de la tarjeta
  return (
    <View>
      {/* Si se presiona el botón desplegara el modal con la información completa del personaje */}
      <TouchableOpacity style={styles.card} onPress={() => setShowModal(true)}>
        {/* Imagen del personaje */}
        <Image
          style={styles.image}
          source={{
            uri: character.image,
          }}
        />
        <View style={styles.content}>
          <View>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.nameText}>{character.name}</Text>
          </View>
          <View>
            <Text style={styles.label}>Estatus y especie</Text>
            <View style={styles.row}>
              <View style={[styles.status, getColorStatus()]}></View>
              <Text style={styles.nameText}>{character.status} - {character.species}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.label}>Ubicación</Text>
            <Text style={[styles.nameText,
            character.location.name.length > 20
              ? styles.smallText
              : undefined,]}
            >{character.location.name}</Text>
          </View>
          <View>
            <Text style={styles.label}>Origen</Text>
            <Text style={[styles.nameText,
            character.origin.name.length > 20
              ? styles.smallText
              : undefined,]}>{character.origin.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* Estructura del modal que se despliega cuando tocamos la tarjeta de uno de los personajes */}
      <Modal
        /* Estado para mostrar o ocultar el modal */
        visible={showModal}
        transparent={true}
        animationType="slide"
      >
        {/* Asigna la información del personaje seleccionado al modal */}
        <ScrollView>
          <View style={styles.modalCard}>
            <View style={styles.margenModalCard}>
              <Image
                style={styles.imageModal}
                source={{
                  uri: character.image,
                }}
              />
              <View style={styles.content}>
                <View>
                  <Text style={styles.label}>Nombre</Text>
                  <Text style={styles.nameText}>{character.name}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Estatus y especie</Text>
                  <View style={styles.row}>
                    <View style={[styles.status, getColorStatus()]}></View>
                    <Text style={styles.nameText}>{character.status} - {character.species}</Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.label}>Género</Text>
                  <Text style={styles.nameText}>{character.gender}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Origen</Text>
                  <Text style={[styles.nameText,
                  character.origin.name.length > 20
                    ? styles.smallText
                    : undefined,]}>{character.origin.name}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Url del origen</Text>
                  <Text style={styles.nameText}>{character.origin.url}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Ubicación</Text>
                  <Text style={[styles.nameText,
                  character.location.name.length > 20
                    ? styles.smallText
                    : undefined,]}
                  >{character.location.name}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Url de la ubicación</Text>
                  <Text style={styles.nameText}>{character.location.url}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Episodios</Text>
                  <Text style={styles.nameText}>{character.episode.length}</Text>
                </View>
              </View>
              {/* Botón para cerrar el modal */}
              <TouchableOpacity
                onPress={() => setShowModal(false)}
                style={styles.buttonModal}
              >
                <Text style={styles.textButton}> Cerrar Modal </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
}
/* Estilos utilizados */
const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "auto",
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "rgb(36, 48, 142)",
    marginBottom: 7,
  },
  image: {
    borderBottomLeftRadius: 16,
    borderTopLeftRadius: 16,
    width: "40%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    gap: 3,
    padding: 7,
    justifyContent: "center",
  },
  label: {
    color: "rgb(199, 198, 198)",
    fontSize: 16,
  },
  nameText: {
    fontSize: 20,
    color: "rgb(255, 255, 255)",
  },
  smallText: {
    fontSize: 13,
  },
  status: {
    width: 10,
    height: 10,
    backgroundColor: "gray",
    borderRadius: "50%",
  },
  alive: {
    backgroundColor: "green",
  },
  dead: {
    backgroundColor: "red",
  },
  unknown: {
    backgroundColor: "orange",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  modalCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 20

  },

  margenModalCard: {
    padding: 3,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "rgb(226, 228, 255)",
    width: "auto",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
  },

  imageModal: {
    width: 180,
    height: 180,
    borderRadius: 100,
  },

  buttonModal: {
    width: 200,
    margin: 5,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#000",
    textAlign: "center",
    backgroundColor: "#ff9100",
  },

  textButton: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

});
