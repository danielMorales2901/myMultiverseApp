//locationCard.tsx
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Location } from "./locationType";
import { useState } from "react";
// tipo para especificar las propiedades de LocationCard
type Props = {
  location: Location;
}
//Tarjeta de personaje
export function LocationCard({ location }: Props) {

  const [showModal, setShowModal] = useState(false);

  //estructura de la tarjeta
  return (
    <View>
      <TouchableOpacity style={styles.card}
        onPress={() => setShowModal(true)}>

        <Image
          style={styles.image}
          source={{
            uri: "https://wallpapers.com/images/high/rick-and-morty-fan-art-ktzj268em97ffdo2.webp",
          }}
        />
        <View style={styles.content}>
          <View>
            <Text style={styles.label}>Nombre</Text>
            <Text style={[styles.nameText,
            location.name.length > 20
              ? styles.smallText
              : undefined,]}>{location.name}</Text>
          </View>

          <View>
            <Text style={styles.label}>Tipo</Text>
            <Text style={[styles.nameText]}>{location.type}</Text>
          </View>

          <View>
            <Text style={styles.label}>Dimensión</Text>
            <Text style={[styles.nameText,
            location.name.length > 14
              ? styles.smallText
              : undefined,]}>{location.dimension}</Text>
          </View>

          <View>
            <Text style={styles.label}>Residentes</Text>
            <Text style={[styles.nameText]}>{location.residents.length}</Text>
          </View>
        </View>
      </TouchableOpacity>

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
                  uri: "https://wallpapers.com/images/high/rick-and-morty-fan-art-ktzj268em97ffdo2.webp",
                }}
              />
              <View style={styles.content}>
                <View>
                  <Text style={styles.label}>Nombre</Text>
                  <Text style={styles.nameText}>{location.name}</Text>
                </View>

                <View>
                  <Text style={styles.label}>Tipo</Text>
                  <Text style={[styles.nameText]}>{location.type}</Text>
                </View>

                <View>
                  <Text style={styles.label}>Dimensión</Text>
                  <Text style={[styles.nameText]}>{location.dimension}</Text>
                </View>

                <View>
                  <Text style={styles.label}>Residentes</Text>
                  <Text style={[styles.nameText]}>{location.residents.length}</Text>
                </View>

                <View>
                  <Text style={styles.label}>Url</Text>
                  <Text style={[styles.nameText]}>{location.url}</Text>
                </View>

                <View>
                  <Text style={styles.label}>Creación</Text>
                  <Text style={[styles.nameText]}>{location.created}</Text>
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
    </View >
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
    padding: 7,
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
