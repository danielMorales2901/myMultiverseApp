//permisssionLayout.tsx
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Text } from "react-native";

type Props = {
  icon: any,
  title: string,
  granted: boolean,
  requestPermission: () => void;
}

export function PermisssionLayout(
  { icon, title, granted, requestPermission }: Props
) {

  return (
    <View style={styles.root}>
      <Ionicons style={styles.fondo} name={icon} size={32} />
      <Text style={styles.title}>{title}</Text>
      {granted ? (
        <Ionicons 
        style={styles.checkIcon}
        name="checkmark-sharp" 
        size={32} 
        color="green"/>
      ) : (
        <TouchableOpacity 
          style={styles.button}
          onPress={()=> requestPermission()}
        >
          <Text style={styles.buttonText}>Autorizar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  root:{
    display:"flex",
    flexDirection:"row",
    gap:16,
    alignItems:"center",
    justifyContent:"center"
  },
  fondo:{
    backgroundColor:"white",
    padding:4,
    borderRadius:16
  },
  title:{
    fontSize:18,
    fontWeight:700,
    width:"50%",
    fontFamily:"monospace",
    color:"white"
  },
  button:{
    backgroundColor:"rgb(235, 255, 255)",
    width:"30%",
    padding:5,
    borderRadius:16,
    borderWidth:2,
    borderColor:"black",
    alignItems:"center",
    justifyContent:"center",
  },
  buttonText:{
    fontSize:12,
    color:"color",
    fontWeight:"500",
    fontFamily:"monospace",
  },
  checkIcon:{
     marginHorizontal:"auto",
  }
});