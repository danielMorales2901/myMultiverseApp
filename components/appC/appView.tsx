import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function AppView() {
  return (
    <View style={styles.content}>
      <View>
        <View style={styles.direcCentro}>
          <Text style={styles.title}>Menú principal</Text>
          <View style={styles.contentBotones}>
            <View>
              {/* Botón para el proyecto de Rick and Morty */}
              <Link href="../rickAndMorty" asChild>
                <Pressable style={styles.button}>
                  <Text style={styles.textButton}>Rick and Morty</Text>
                </Pressable>
              </Link>
            </View>
            <View>
              {/* Botón para el proyecto de Notes */}
              <Link href="../notes" asChild>
                <Pressable style={styles.button}>
                  <Text style={styles.textButton}>Notas</Text>
                </Pressable>
              </Link>
            </View>
            <View>
              {/* Botón para el proyecto de Permisos */}
              <Link href="../permissions" asChild>
                <Pressable style={styles.button}>
                  <Text style={styles.textButton}>Permisos</Text>
                </Pressable>
              </Link>
            </View>
            <View>
              {/* Botón para el proyecto de Cámara y Galería */}
              <Link href="../cameraGallery" asChild>
                <Pressable style={styles.button}>
                  <Text style={styles.textButton}>Cámara</Text>
                </Pressable>
              </Link>
            </View>
            <View>
              {/* Botón para el proyecto de GPS */}
              <Link href="../permissionGPS" asChild>
                <Pressable style={styles.button}>
                  <Text style={styles.textButton}>GPS</Text>
                </Pressable>
              </Link>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgb(39, 39, 39)"
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30
  },
  direcCentro: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  contentBotones: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 15,
  },
  textButton: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    width: 200,
    padding: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#000",
    textAlign: "center",
    backgroundColor: "rgb(235, 255, 255)",
  },
});  
