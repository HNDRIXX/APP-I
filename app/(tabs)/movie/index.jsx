import { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator} from "react-native";
import { useMovie } from "../../hooks/useMovie";

import { router, useRouter } from "expo-router";
import { COLORS, useFonts } from "../../../constant";
import { Image } from "react-native";
import MovieCard from "../../../components/card/MovieCard";
import { SafeAreaView } from "react-native-safe-area-context";

export default MovieIndex = () => {
    const [movieData, setMovieData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)

    const onPress = () => {
        router.push(`/movie-page/${'data'}`)
    }

    const fetchMovieData = useCallback(async () => {
        try {
            setIsLoading(true)
            const data = await useMovie(currentPage);

            if (data && data.results && data.results.length > 0) {
                const movieDataArray = data.results.map(result => ({
                    title: result.originalTitleText.text,
                    imageUrl: result.primaryImage !== null ? result.primaryImage.url : undefined,
                    caption: result.primaryImage !== null ? result.primaryImage.caption : undefined,
                    releaseDate: result.releaseDate.year
                }));

                setMovieData(prevData => [...prevData, ...movieDataArray]);
                setCurrentPage(currentPage + 1)
            } else {}

            setIsLoading(false)
        } catch (error) { console.error(error);  }
    }, [currentPage]);

    useEffect(() => {
        fetchMovieData();
    }, [fetchMovieData]);

    return (
        <View style={styles.container}>
            <View style={styles.headerWrapper}>
                <Text style={styles.headerText}>Top Rated</Text>
                <Text style={styles.headerSubText}>Listed movies, Take a look!</Text>
            </View>
            
            { !isLoading ? (
                <FlatList 
                    data={movieData}
                    renderItem={({ item }) => (
                        <MovieCard 
                            data={item}
                            onPress={onPress}
                        />
                    )}
                    style={styles.listCard}
                    contentContainerStyle={{ rowGap: 10 }}
                />
            ) : ( 
                <View style={styles.loaderWrapper}>
                    <ActivityIndicator color={COLORS.orange} size={'large'} />
                    <Text>Currently fetching the list.</Text>
                    <Text>Please Wait...</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    }, 

    loaderWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    listCard: {
        marginTop: 20,
    },

    headerText: { 
        fontFamily: 'DMSans_700Bold',
        color: COLORS.orange,
        fontSize: 30,
        letterSpacing: -1.5,
    }
})