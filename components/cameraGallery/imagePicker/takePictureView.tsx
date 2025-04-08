import { Ionicons } from '@expo/vector-icons';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { Button, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//Definimos propiedas y sus tipos para el archivo, ambos son de tipo función //solo que el segundo debe recibir una uri(url) como propiedad.
type Props = {
  onClose: () => void;
  onTakePicture: (uri: string) => void;
}
//Le pasamos al componente las propiedas y con los Props que acabamos de //hacer le decimos del tipo que serán
export function TakePictureView({ onClose, onTakePicture }: Props) {
  //Este estado nos va a ayudar a saber si se esta usando la cámara trasera o //delantera del dispositivo y por predeterminado abre la trasera.
  const [facing, setFacing] = useState<CameraType>('back');
  //A este archivo le debemos de pasar los permisos de la cámara para que se //pidan en caso de no tenerlos.
  const [permission, requestPermission] = useCameraPermissions();
  //La siguiente constante es para manejar los permisos de la cámara
  const ref = useRef<CameraView>(null);
  //La siguiente función nos apoya para poder tomar la foto, capturarla en una //constante y del archivo que se captura debemos de regresarla por la //propiedad que estamos usando “onTakePicture”.
  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    //Si hay contenido en el apartado “uri” de la foto que tomamo, debemos de //retornar en la propiedad.
    if (photo?.uri) {
      onTakePicture(photo?.uri);
    }
  };

  if (!permission) {
    // Los permisos de la cámara aún se están cargando.
    return <View />;
  }



  if (!permission.granted) {
    // Aún no se han concedido los permisos de la cámara y pude los permisos //al usuario
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  //Esta función nos ayuda a cambiar entre las cámaras del disposito.
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={ref}//Dar referencia de la cámara y que métodos se esta usando //en nuestro caso solo la cámara.
        style={styles.camera}
        facing={facing} //para saber qué cámara se está usando.
      >
        <View style={styles.buttonContainer}>
          {/* Botón para cerrar la cámara. */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => onClose()}>
            <Ionicons
              name="close"
              size={32}
              color="#FFF"
            />
          </TouchableOpacity>

          {/* Botón para tomar la foto. */}
          <TouchableOpacity
            style={styles.button}
            onPress={takePicture}
          >
            <Ionicons
              name="camera-outline"
              size={32}
              color="#FFF"
            />
          </TouchableOpacity>

          {/* Botón para alternar entre las cámaras. */}
          <TouchableOpacity
            style={styles.button}
            onPress={toggleCameraFacing}>
            <Ionicons
              name="camera-reverse-outline"
              size={32}
              color="#FFF"
            />
          </TouchableOpacity>


        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
