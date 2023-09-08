import { View, Text, StyleSheet, ScrollView, FlatList, SafeAreaView, ActivityIndicator, Dimensions } from "react-native";
import { Image } from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { useFonts } from "../../constant";
import { COLORS } from "../../constant";
import { useState, useEffect } from "react";

import { getDictionary } from "../hooks/useFetch";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from '@expo/vector-icons'; 

const width = Dimensions.get('window')

export default App = () => {
    const params = useGlobalSearchParams()
    const [fontsLoaded] = useFonts()

    const item = JSON.parse(params.movie || '{}')
    // console.log('VALUE: ' + item.title)

    const [wordInput, setWordInput] = useState(item.title)
    const [wordData, setWordData] = useState({
        phonetic: [],
        definition: [],
        sourceUrl: []
    })

    const [isLoading, setIsLoading] = useState()

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image 
                    source={{ uri : item.imageUrl }}
                    style={{ width: '100%', height: 600 }}
                    resizeMode="cover"    
                />
            </View>

            <View style={styles.textWrapper}>
                <Text style={styles.titleText}>{item.title}</Text>
                    { isLoading ? ( 
                        <View style={styles.loaderWrapper}>
                            <ActivityIndicator color={COLORS.orange} size={'large'} />
                            <Text>Loading...</Text>
                        </View>
                    ) : ( 
                        <>
                            <Text style={styles.dateText}>{item.releaseDate}</Text>

                            <ScrollView style={styles.scrollCaption}>
                                <Text style={styles.captionText}>{item.caption.plainText}</Text>
                            </ScrollView>
                        </>
                    )}
            </View>
        </SafeAreaView>
    )   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    textWrapper: {
        padding: 20,
    },

    loaderWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    definitionTitle: {
        fontSize: 16,
        paddingVertical: 10,
        fontFamily: 'DMSans_700Bold'
    },

    titleText: {
        fontFamily: 'DMSans_700Bold',
        fontSize: 40,
        letterSpacing: -1.5,
        lineHeight: 45,
        color: COLORS.orange,
    },

    scrollCaption: {
        marginVertical: 10,
    },

    dateText: { fontFamily: 'DMSans_500Medium' },
    captionText: { fontFamily: 'DMSans_500Medium', lineHeight: 15 }
})