import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
export function InfoEstudentView() {
  return (
    <ScrollView>
      <LinearGradient
        colors={['rgb(34, 53, 194)', 'rgb(118, 137, 245)', 'rgb(118, 137, 245)', 'rgb(34, 53, 194)']}
        style={styles.background}
      >
        <View style={styles.content}>
          <Text style={[styles.nameTitle, { textAlign: "center" }]}>Daniel Olivares Morales</Text>
          <View style={styles.contentFoto}>

            <Image source={require("../../assets/images/fotoDani.jpg")} style={styles.fotoDani} />
          </View>

          <View>
            <Text style={styles.label}>Reseña personal:</Text>
            <Text style={styles.text}>
              Soy estudiante en la Universidad Tecnológica de Izucar de Matamoros, donde curso la carrera de Tecnico Superior Universitario en Desarrollo de Software Multiplataforma. Soy un fanático de los deportes, especialmente el fútbol, voleibol y baloncesto. Mi objetivo es obtener el título de TSU en Desarrollo de Software Multiplataforma y, posteriormente, continuar mis estudios para obtener el título de Ingeniería.
            </Text>
          </View>
          <View>
            <Text style={styles.label}>Fecha de nacimiento:</Text>
            <Text style={styles.text}>29 de enero del 2005</Text>
          </View>
          <View>
            <Text style={styles.label}>Correo Electronico:</Text>
            <Text style={styles.text}>ironigevening@gmail.com</Text>
          </View>
          <View>
            <Text style={styles.label}>Numero de telefono:</Text>
            <Text style={styles.text}>243-144-5376</Text>
          </View>
          <View>
            <View style={styles.contentRedes}>
              <Link href="https://www.instagram.com/daniel_morales029?utm_source=qr&igsh=dGM3emIyd2Rnemt2" >
                <Ionicons size={30} name="logo-instagram" color={"white"} />
              </Link>
              <Link href="https://www.facebook.com/share/12FQduU5XZC/">
                <Ionicons size={30} name="logo-facebook" color={"white"} />
              </Link>
            </View>
          </View>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
    padding: 8,
    gap: 6,
  },
  background: {
    flex: 1,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
    objectFit: "cover",
  },
  contentFoto: {
    width: "100%",
    height: "auto",
    alignItems: "center",
    gap: 10,
    marginBottom: 5,
  },
  fotoDani: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  nameTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white"

  },
  label: {
    color: "rgb(207, 207, 207)",
    fontSize: 18,
    marginBottom: 1,
    fontWeight: "700",
  },
  text: {
    fontSize: 16,
    color: "white"
  },
  contentRedes: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "auto",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    gap: 20
  }
});  