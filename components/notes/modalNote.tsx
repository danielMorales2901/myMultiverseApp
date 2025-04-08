import { useEffect, useState } from "react";
import { Modal, StyleSheet, View, TextInput, Button } from "react-native";
import { Note } from "./note";

//propiedades para el modal
type Props = {
    note: Note | null;
    open: boolean,
    onSave: (note: Note) => void;
    onClose: () => void;
}

export function ModalNote({
    note,
    open,
    onSave,
    onClose
}: Props
) {
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");

    const handleSave = () => {
        //sino se tiene no que editar, retornar
        if (!note) return;
        onSave({
            ...note,
            title,
            text,
        })
    }
    
    //cada vez que cambie nota, reiniciar el estado
    useEffect(() => {
        setTitle(note?.title || "")
        setText(note?.text || "")
    }, [note]);
    /* setText("")
    setTitle("") */

    return (
        <Modal
            visible={open}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalCard}>
                    <TextInput
                        style={styles.inputTitle}
                        placeholder="Título"
                        value={title}
                        onChangeText={setTitle}
                    />
                    <TextInput
                        style={styles.inputNote}
                        placeholder="Escribe tu nota..."
                        value={text}
                        onChangeText={setText}
                        multiline
                    />
                    <View style={styles.buttonContainer}>
                        <Button title="Cancelar"
                            onPress={onClose}
                            color="#888" />
                        <Button
                            title="Guardar"
                            onPress={handleSave} color="#007BFF" />
                    </View>
                </View>
            </View>
        </Modal>
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

    },
    inputTitle: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        marginBottom: 10,
        padding: 8,
        fontSize: 16,
    },
    inputNote: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 8,
        minHeight: 100,
        textAlignVertical: "top",
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
