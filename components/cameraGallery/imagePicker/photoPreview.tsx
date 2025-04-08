import { Ionicons } from "@expo/vector-icons";
import { Button, Image, StyleSheet, TouchableOpacity, View } from "react-native";

//Declaramos unos props para que al usar el archivo se le pasen lo siguiente:
type Props = {
  uri: string; //uri de la imagen
  onSave: (uri: string) => void; //función para guardar la imagen
  onCancel: () => void; //función para cancelar la acción
  onNewPhoto: () => void; //función para tomar una nueva foto.
}

//le pasamos los props al componente
export function PhotoPreview({ uri, onSave, onCancel, onNewPhoto }: Props) {

  return (
    <View style={styles.container}>
      {/* Mostramos la imagen que recibimos */}
      <Image
        source={{ uri }}
        style={styles.image}
      />

      <View style={styles.buttonContainer}>
        {/* Botón para cancelar la foto */}
        <TouchableOpacity
          onPress={onCancel}
        >
          <Ionicons
            name="close"
            size={32}
            color="#FFF"
          />
        </TouchableOpacity>

        {/* Botón para guardar la imagen y mandamos la uri*/}
        <TouchableOpacity
          onPress={() => onSave(uri)}
        >
          <Ionicons
            name="save-outline"
            size={32}
            color="#FFF"
          />
        </TouchableOpacity>

        {/* Botón para descartar y tomar una foto */}
        <TouchableOpacity
          onPress={onNewPhoto}>
          <Ionicons
            name="camera-reverse-outline"
            size={32}
            color="#FFF"
          />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    objectFit: "contain",
    height: 500
  },
  buttonContainer: {
    width: "100%",
    flexDirection: 'row',
    margin: 64,
    justifyContent: "space-around",
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },

});