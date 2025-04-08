//episodeCard.tsx
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Episode } from "./episodesType";
import { useState } from "react";
// tipo para especificar las propiedades de EpisodeCard
type Props = {
  episode: Episode;
}
//Tarjeta de personaje
export function EpisodeCard({ episode }: Props) {
  const [showModal, setShowModal] = useState(false);
  //estructura de la tarjeta
  return (
    <View>
      <TouchableOpacity style={styles.card} onPress={() => setShowModal(true)}>
        <Image
          style={styles.image}
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqC-_4TyqkzbLmO6Knr7C-_qwMK0b2fAITQA&s",
          }}
        />
        <View style={styles.content}>
          <View>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.nameText}>{episode.name}</Text>
          </View>

          <View>
            <Text style={styles.label}>Fecha de lanzamiento</Text>
            <Text style={styles.nameText}
            >{episode.air_date}</Text>
          </View>

          <View>
            <Text style={styles.label}>Episodio</Text>
            <Text style={styles.nameText}>{episode.episode}</Text>
          </View>

          <View>
            <Text style={styles.label}>Personajes</Text>
            <Text style={styles.nameText}>{episode.characters.length}</Text>
          </View>
        </View>

        <Modal
          visible={showModal}
          transparent={true}
          animationType="slide"
        >
          <ScrollView>
            <View style={styles.modalCard}>
              <View style={styles.margenModalCard}>
                <Image
                  style={styles.imageModal}
                  source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqC-_4TyqkzbLmO6Knr7C-_qwMK0b2fAITQA&s",
                  }}
                />
                <View style={styles.content}>

                  <View>
                    <Text style={styles.label}>Nombre</Text>
                    <Text style={styles.nameText}>{episode.name}</Text>
                  </View>

                  <View>
                    <Text style={styles.label}>Fecha de lanzamiento</Text>
                    <Text style={[styles.nameText]}
                    >{episode.air_date}</Text>
                  </View>
                  <View>
                    <Text style={styles.label}>Episodio</Text>
                    <Text style={[styles.nameText]}>{episode.episode}</Text>
                  </View>

                  <View>
                    <Text style={styles.label}>Personajes</Text>
                    <Text style={[styles.nameText]}>{episode.characters.length}</Text>
                  </View>

                  <View>
                    <Text style={styles.label}>Url</Text>
                    <Text style={[styles.nameText]}>{episode.url}</Text>
                  </View>

                  <View>
                    <Text style={styles.label}>Creación</Text>
                    <Text style={[styles.nameText]}>{episode.created}</Text>
                  </View>

                </View>
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
      </TouchableOpacity>
    </View>
  );
}
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
    overflow: "hidden",
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
    padding: 20,
  },
  margenModalCard: {
    padding: 6,
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
    backgroundColor: "#ff9100",
  },
  textButton: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
