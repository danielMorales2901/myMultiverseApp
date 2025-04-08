import { StyleSheet, Text, View } from "react-native";
import { CameraPermission } from "./cameraPermission";
import { GalleryPermission } from "./galleryPermisssion";
import { MicrophonePermission } from "./microphonePermission";
import { LocationPermission } from "./locationPermission";
import { ContactPermission } from "./contactPermission";
import { CalendaryPermission } from "./calendaryPermission";
export function PermissionsView(){
  return(
    <View style={styles.container}>
      <Text style={styles.title}>Permisos</Text>
        <CameraPermission/>
        <GalleryPermission/>
        <MicrophonePermission/>
        <LocationPermission/>
        <ContactPermission/>
        <CalendaryPermission/>
    </View>
  );
}
const styles = StyleSheet.create({
  container:{
    height:"100%",
    paddingTop:60,
    backgroundColor:"rgb(39, 39, 39)",
    gap:16,
    padding:10,
    paddingLeft:15
  },
  title:{
    paddingBottom:10,
    fontSize:20,
    fontFamily:"monospace",
    fontWeight:"700",
    color:"white"
  }
});