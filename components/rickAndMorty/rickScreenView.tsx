import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function RickScreenView() {
  return (
    /* Componente que cubre todo el contenido y sirve para hacer degradado entre colores */
    <LinearGradient
      colors={[ "rgb(39, 39, 39)", "#4a148c", "#008cff",  "rgb(39, 39, 39)"]}
      style={styles.background}>
      <View style={styles.content}>
        <View>
          <View style={styles.direcCentro}>
            <Text style={styles.title}>Rick and Morty</Text>
            {/* Imagen de la serie que nos sirve como logo del proyecto */}
            <Image
              style={styles.image}
              source={{ uri: "https://wallpapers.com/images/high/rick-and-morty-fan-art-qe6nney5qsd8xfzq.webp" }}
            />
            <View style={styles.contentBotones}>
              <View>
                {/* Botón para ir al tabBar de los personajes */}
                <Link href="../rickAndMorty/(characters)" asChild>
                  <Pressable style={styles.buttonCharacters}>
                    <Text style={styles.textButton}>Personajes</Text>
                  </Pressable>
                </Link>
              </View>
              <View>
                {/* Botón para ir al tabBar de los episodios */}
                <Link href="../rickAndMorty/(episodes)" asChild>
                  <Pressable style={styles.buttonEpisodes}>
                    <Text style={styles.textButton}>Episodios</Text>
                  </Pressable>
                </Link>
              </View>
              <View>
                {/* Botón para ir al tabBar de los ubicaciones */}
                <Link href="../rickAndMorty/(locations)" asChild>
                  <Pressable style={styles.buttonLocation}>
                    <Text style={styles.textButton}>Ubicaciones</Text>
                  </Pressable>
                </Link>
              </View>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color:"white"
  },
  direcCentro: {
    alignItems: "center",
    justifyContent: "center",
    gap: 7,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
  },
  contentBotones: {
    width: "50%",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 5,
  },
  textButton: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonCharacters: {
    width: 200,
    padding: 5,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#000",
    textAlign: "center",
    backgroundColor: "rgb(235, 255, 255)",
  },
  buttonEpisodes: {
    width: 200,
    padding: 5,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#000",
    textAlign: "center",
    backgroundColor: "rgb(235, 255, 255)",
  },
  buttonLocation: {
    width: 200,
    padding: 5,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#000",
    textAlign: "center",
    backgroundColor: "rgb(235, 255, 255)",
  },

  buttonInfo: {
    width: 200,
    padding: 5,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "#000",
    textAlign: "center",
    backgroundColor: "#ff9100",
  },

});  
