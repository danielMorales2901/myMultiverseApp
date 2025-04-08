import { ActivityIndicator, Alert, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Location } from "./locationType";
import { LocationCard } from "./locationCard";
import { useEffect, useState } from "react";
import { LocationsResult } from "./locationsResult";
import { DataSource } from "./dataSource";
export function LocationsView() {
    //definir el estado 
    const [loading, setLoading] = useState(false);

    //constante de estado que nos indica en que valor/pagina
    //de la api iniciara nuestra app
    const [page, setPage] = useState(1)

    //asignamos a una constante de estado nuestro type de LocationsResult
    const [data, setData] = useState<LocationsResult>({
        info: {
            pages: 0,
            count: 0,
            next: null,
            prev: null,
        },
        results: [],
    });

    //asignamos a una constante lo que tiene nuestro clase DataSource 
    const dataSource = new DataSource();

    useEffect(() => {
        setLoading(true); //esta cargando
        dataSource.getLocations(page)
            .then((response) => {
                setData(response)
            })
            .catch((error) => {
                Alert.alert(`Error: ${error.message}`);
            })
            .finally(() => {
                setLoading(false); //ya no esta cargando
            })
    }, [page]);

    return (
        <SafeAreaView style={styles.content}>
            <View style={styles.barra}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        styles.prev,
                        data.info.prev === null
                            ? styles.disabled : undefined
                    ]}
                    onPress={() => setPage(page - 1)}
                    disabled={data.info.prev === null}
                >
                    <Text>Anterior</Text>
                </TouchableOpacity>
                <Text style={styles.title}>
                    Página {page} de {data.info.pages}
                </Text>
                <TouchableOpacity
                    style={[styles.button,
                    styles.next,
                    data.info.next === null
                        ? styles.disabled : undefined
                    ]}
                    onPress={() => setPage(page + 1)}
                    disabled={data.info.next === null}
                >
                    <Text>Siguiente</Text>
                </TouchableOpacity>
            </View>
            {/* Si está cargando muestra el indicador, sino, 
                no muestres nada */}
            {loading ? (
                <ActivityIndicator size={"large"} />
            ) : null}
            {/* {data.results.map((item) => (
                <LocationCard
                    key={item.id}//identificar el componente cuando se pinte en la pantalla
                    character={item}
                />
            ))}  */}
            <FlatList
                data={data.results}
                renderItem={({ item }) => (
                    <LocationCard
                        location={item}
                    />
                )}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: 8,
        width: "100%",
        height: "100%",
        paddingBottom: 13,
        backgroundColor: "rgb(39, 39, 39)"
    },
    barra: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        width: "100%",
        height: 70,
        backgroundColor: "rgb(112, 110, 114)",
        marginBottom: 7,
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color:"white",
    },
    button: {
        width: "25%",
        height: 35,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#000",
    },
    prev: {
        backgroundColor: "white"
    },
    next: {
        backgroundColor: "rgb(228, 228, 228)"
    },
    disabled: {
        opacity: 0.5,
    }
});