import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Note } from "./note";
import { useEffect, useState } from "react";
import { DataSource } from "./dataSource";
import { ModalNote } from "./modalNote";

export function NotesView() {

  //instancia del dataSource
  const dataSource = new DataSource();
  //estado para la lista de notas
  const [notes, setNotes] = useState<Note[]>([]);

  //nota que se editará en el modal 
  //si hay valor en en editNote, el modal se abre, sino, se cierra
  const [editNote, setEditNote] = useState<Note | null>(null);

  const handleAddNote = () => {
    setEditNote({
      title: "",
      text: "",
      date: new Date(),
    })
  }

  const handleSaveNote = (note: Note) => {
    console.log("Guardar", note)
    dataSource.saveNote(note)
      .then((result) => {
        if (result === null) {
          Alert.alert("No se guardo la nota.");
          return; //cancelar la acción
        }
        // si la nota es nueva, agregarla
        // si la nota no es nueva, actualizarla en la lista
        if (!note.id) {
          setNotes([...notes, result]);
        } else {
          setNotes(
            notes.map((item) => item.id === result.id ? result : item)
          )
        }
        //cerrar el modal
        setEditNote(null)
      });
    setEditNote(null)
  }

  const handleDelete = (id: number) => {
    dataSource.deleteNote(id)
      .then((deleted) => {
        if (deleted) {
          //tomar las notas donde el id no sea el eliminado 
          setNotes(notes.filter((item) => item.id !== id));
          Alert.alert("Se elimido la nota")
        }
      })
  }

  useEffect(() => {
    dataSource.getNotes()
      .then((results) => {
        setNotes(results)
      })
      .catch((error) => {
        Alert.alert(`Error ${error.message}`);
      })
  }, [])

  const renderNote = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => setEditNote(item)}
      onLongPress={() => handleDelete(item.id || 0)}
    >
      <View>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.nameText}>{item.title}</Text>
      </View>
      <View>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.nameText}>{item.text}</Text>
      </View>
      <View>
        <Text style={styles.label}>Date</Text>
        <Text style={styles.nameText}>{item.date.toLocaleDateString()}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bloc de notas</Text>
      <FlatList
        style={styles.flat}
        data={notes}
        renderItem={renderNote}
        keyExtractor={(item) => item.id?.toString() || ""}
      />
      <View style={styles.endButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleAddNote}
        >
          <Text style={styles.buttonText}>Agregar</Text>
        </TouchableOpacity>
        <ModalNote
          note={editNote}
          open={!!editNote}
          onClose={() => setEditNote(null)}
          onSave={handleSaveNote}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gray",
    paddingTop: 45,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%"
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 5,
    paddingTop: 5,
    color: "white"
  },
  card: {
    width: "95%",
    height: "auto",
    padding: 4,
    gap: 3,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#000",
    backgroundColor: "white",
    marginBottom: 7,
    overflow: "hidden",
    marginLeft: 10,
  },
  label: {
    color: "rgb(139, 136, 136)",
    fontSize: 16,
    fontFamily: "sans-serif-medium",
  },
  nameText: {
    fontSize: 18,
    color: "#000",
    fontFamily: "monospace", // Android
  },
  endButton: {
    position: "absolute",
    right: 20,
    bottom: 20
  },
  button: {
    width: "auto",
    height: "auto",
    backgroundColor: "rgb(186, 184, 184)",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
  flat: {
    width: "100%"
  }

});