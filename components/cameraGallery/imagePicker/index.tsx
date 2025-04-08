/* archivo principal para implementar el componente
  que nos permita:
  * Seleccionar el origen de la imagen: Cámara o galería
  * Visualizar la imagen seleccionada
  * Muestra un botón para lanzar el picker
*/
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Alert, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as PhotoPicker from 'expo-image-picker';
import { TakePictureView } from "./takePictureView";
import { PhotoPreview } from "./photoPreview";

// Declara un props para poder guardar la imagen en el array del archivo principal
type Props = {
  photo: (uri: string) => void;
}

//Pasamos el prop al componente
export function ImagePicker({ photo }: Props) {
  //Estado para el modal que inicializamos en false para que no se abra al cargar la vista
  const [modalOpen, setModalOpen] = useState(false)

  //estado para indicar si la camara esta abierta o no
  const [cameraOpen, setCameraOpen] = useState(false)

  //estado para la imagen
  const [image, setImage] = useState<string | undefined>(undefined)

  //constante para conocer el ancho de la pantalla
  const { width } = Dimensions.get('window')

  // Función que se ejecuta cuando se toma una foto con la cámara
  const onPictureTaked = (uri?: string) => {
    setImage(uri);
    setCameraOpen(false);
  }

  //Fucnión para tomar una nueva foto
  const onNewPhoto = () => {
    setImage(undefined); //vaciamos el contenido del estado images
    setCameraOpen(true); //abrimos la cámara
  }

  //Funcion para mandar a guardar la foto en el array del archivo principal
  const onSavePhoto = (uri: string) => {
    //ToDo: guardar a imagen
    photo(uri) //le pasamos la imagen a la propiedad del componente
    //resetear los estados
    setModalOpen(false); //abrimos modal
    setImage(undefined); //Vaciamos el contenido del estado
    Alert.alert("Foto guardada") //Alerta para decirle al usuario que su foto se guardo correctamente
  }

  // Función para seleccionar una imagen desde la galería
  const pickImage = async () => {
    let result = await PhotoPicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  //Estructura del modal
  const menuItems = (
    <View style={styles.modalContainer}>
      <View style={[styles.modalCard, { width: width * 0.6 }]}>
        {/* Titulo */}
        <Text style={styles.title}>Origen de la imagen</Text>
        <View style={styles.actions}>
          {/* Botón para abrir la cámara */}
          <TouchableOpacity
            onPress={() => setCameraOpen(true)}
            style={[styles.button, styles.buttoncamera]}
          >
            <Text style={styles.textButton}>Cámara</Text>
          </TouchableOpacity>

          {/* Botón para abrir la galeria */}
          <TouchableOpacity
            style={[styles.button, styles.buttonGallery]}
            onPress={pickImage}
          >
            <Text style={styles.textButton}>Galería</Text>
          </TouchableOpacity>
        </View>

        {/* Botón para cerrar el modal */}
        <View style={styles.line} />
        <TouchableOpacity
          style={[styles.button, styles.buttonCancel]}
          onPress={() => setModalOpen(false)}
        >
          <Text style={styles.textButton}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <>
      {/* Botón para lanzar el modal */}
      <TouchableOpacity
        onPress={() => setModalOpen(true)}
      >
        <Ionicons
          name="camera-outline"
          size={32}
          color={"white"}
        />
      </TouchableOpacity>
      {/* Modal y sus parametros */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen} //depende del estado de modalOpen
        onRequestClose={() => setModalOpen(false)}
      >
        {/* Si no hay camara ni imagen, mostrar el menú de selección */}
        {!cameraOpen && !image ? menuItems : null}

        {/* Si la camara esta abierta llamar el componente TakePictureView */}
        {cameraOpen ? (
          <TakePictureView
            onClose={() => setCameraOpen(false)} /* cerrar camara */
            onTakePicture={onPictureTaked} /* pasar la funcion para concer si se guarda o no la imagen */
          />
        ) : null}

        {/* si hay imagen mandamos a traer el componente de PhotoPreview */}
        {image ? (
          <PhotoPreview
            uri={image} /* uri de la imagen */
            onCancel={() => setImage(undefined)} /* Descartamos la imagen */
            onSave={onSavePhoto} /* Guardamos imagen */
            onNewPhoto={onNewPhoto} /> /* Descartar la imagen actual y tomar otra */
        ) : null}
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalCard: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    gap: 15,
    alignItems: "center"
  },

  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center"
  },
  button: {
    borderRadius: 7,
    borderColor: "black",
    borderWidth: 1.5,
    width: 110,
    alignItems: "center",
    justifyContent: "center",
    padding: 7,
    backgroundColor: "rgb(110, 227, 237)"
  },
  buttoncamera: {
    backgroundColor: "rgb(110, 227, 237)"
  },
  buttonGallery: {
    backgroundColor: "rgb(110, 227, 237)"
  },
  buttonCancel: {
    backgroundColor: "rgb(243, 125, 52)"
  },
  textButton: {
    color: "white",
    fontSize: 14,
    fontFamily: "monospace"
  },
  title: {
    fontSize: 18,
    fontFamily: "monospace",
    textAlign:"center"
  },
  line: {
    borderBottomColor: "gray",
    borderBottomWidth: 2,
    width: 170
  }
})