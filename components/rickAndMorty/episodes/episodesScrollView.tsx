import { ActivityIndicator, Alert, Button, FlatList, SafeAreaView, ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from "react-native";
import { Episode } from "./episodesType";
import { EpisodeCard } from "./episodeCard";
import { useEffect, useRef, useState } from "react";
import { EpisodesResult } from "./episodesResult";
import { DataSource } from "./dataSource";

export function EpisodesScrollView() {
    //definir el estado 
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const [data, setData] = useState<EpisodesResult>({
        info: {
            pages: 0,
            count: 0,
            next: null,
            prev: null,
        },
        results: [],
    });

    //instancia del datasource
    const dataSource = new DataSource();

    //refrerencia para el flatlist
    const flatlistRef = useRef(null);

    //función para disparar la carga
    const handleEndRached = () => {
        //si hay página siguiente y
        //no esta cargando, entonces incrementar la pagina
        if (data.info.next && !loading) {
            setPage(page + 1);
        }
    }

    useEffect(() => {
        setLoading(true); //esta cargando
        dataSource.getEpisodes(page)
            .then((response) => {
                //conservar los personajes ya cargados
                //reaccionar como valor el objeto que retorna la función de 
                //callback que debe unir todos los personajes
                setData((prevData) => ({
                    results: [...prevData.results, ...response.results],
                    info: response.info,
                }))
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
                <Text style={styles.title}>
                    Episodios {data.results.length} de {data.info.count}
                </Text>
            </View>
            {/* Si está cargando muestra el indicador, sino, 
                no muestres nada */}

            {/* {data.results.map((item) => (
                <EpisodeCard
                    key={item.id}//identificar el componente cuando se pinte en la pantalla
                    character={item}
                />
            ))}  */}
            <FlatList
                data={data.results}
                renderItem={({ item }) => (
                    <EpisodeCard
                        episode={item}
                    />
                )}
                keyExtractor={item => item.id.toString()}
                ref={flatlistRef}
                onEndReached={handleEndRached}
                onEndReachedThreshold={0.5}
                refreshing={loading}// es el porcentaje del final para que se mande a cargar contenido
                ListFooterComponent={loading
                    ? <ActivityIndicator size={"large"} />
                    : undefined
                }  // si se deja en uno siempre se muestra el scroll de cargando
            />

            {loading ? (
                <ActivityIndicator size={"large"} />
            ) : null}
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
        color:"white"
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