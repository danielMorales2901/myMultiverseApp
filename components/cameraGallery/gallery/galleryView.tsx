//galleryView.tsx
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { ImagePicker } from "../imagePicker";
import { useState } from "react";
export function GalleryView() {
  //estado para la lista o colleción de imagenes
  const [images, setImages] = useState<string[]>([]);
  //función para recibir la imagen 
  const newPhoto = (uri: string) => {
    setImages([...images, uri]) //tomamos todo lo que tenga el array y le agregamos la nueva foto
  }
  //mensaje en la consola para ver el contenido del array, no es necesario de tener
  // console.log(images)
  //contenido
  return (
    <View
      style={styles.container}
    >
      {/* Mandamos a traer a el componente de ImagePicker para recibir las fotos que se vayan guardando por el usuario */}
      <ImagePicker
        // pasarle la función para recibir la imagen
        photo={newPhoto}
      />
      {/*  mostrar la grid o galeria de imagenes */}
      <View style={styles.flatList}>
        <Text style={styles.title}>Galería de imágenes</Text>
        {/* El FlatList nos ayuda a mostrar nuestras imagenes */}
        <FlatList
          data={images}
          renderItem={({ item }) => (
            <Image
              source={{ uri: item }}
              style={styles.image} />
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 30,
    backgroundColor: "rgb(39, 39, 39)",
    flex: 1,
  },
  flatList: {
    gap: 10,
    padding: 10,
    paddingBottom: 50,
  },
  title: {
    fontFamily: "monospace",
    fontSize: 18,
    textAlign: "center",
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    color:"white",
  },
  image:{
    width: 320, 
    height: 210, 
    margin: 10,
  }
});