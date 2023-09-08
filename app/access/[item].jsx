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

    const item = JSON.parse(params.item || '{}')
    // console.log('VALUE: ' + item.title)

    const [wordInput, setWordInput] = useState(item.title)
    const [wordData, setWordData] = useState({
        phonetic: [],
        definition: [],
        sourceUrl: []
    })

    const [isLoading, setIsLoading] = useState()

    const handleSearch = async () => {
        setIsLoading(true)

        try {
            const data = await getDictionary( wordInput )
            
            const allDefinition = []
            const meanings = data[0].meanings || []

            meanings.forEach((meaning, meaningIndex) => {
                const definitions = meaning.definitions || [];
            
                definitions.forEach((wordData, definitionIndex) => {
                    allDefinition.push(wordData.definition + '\n')
                })
            })

            if(data.length > 0){
                const dataPhonetic = data[0].phonetic || [],
                      dataUrl = data[0].sourceUrls || []
                      
                setWordData({
                    phonetic: dataPhonetic,
                    definition: allDefinition,
                    sourceUrl: dataUrl
                })

            } else{ setDefinition("Search Word is Not Found") }
        } catch (error) { setDefinition(error) 
        } finally { setIsLoading(false) }
    }

    useEffect(() => {
        handleSearch()
    }, [setWordData])
        
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image 
                    source={{ uri : item.image }}
                    style={{ width: '100%', height: 400 }}
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
                            <Text>{wordData.phonetic}</Text>
                            <Text>{wordData.example}</Text>

                            <View>
                                <Text style={styles.definitionTitle}>Definitions :</Text>
                            </View>

                            <ScrollView contentContainerStyle={{ flexGrow: 0 }} >
                                {wordData.definition.map((index, item) => (
                                    <View style={styles.textView} key={index}>
                                        <Text style={styles.textDefinitions}>{index}</Text> 
                                    </View>
                                ))}
                            </ScrollView>
                            
                            
                            <View style={styles.footerWrapper}>
                                <Entypo name="info-with-circle" size={24} color={COLORS.orange} />
                                <Text style={styles.textUrl}>{wordData.sourceUrl}</Text>
                            </View>

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
        flex: 1,
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

    textView: {
        // width: 350,
        backgroundColor: COLORS.lightGray2,
        borderTopColor: COLORS.orange,
        borderTopWidth: 3,
        marginVertical: 10,
        justifyContent: 'center',
    },

    titleText: {
        fontFamily: 'DMSans_700Bold',
        fontSize: 40,
        letterSpacing: -1.5,
        color: COLORS.orange,
    },
    
    textDefinitions: {
        padding: 20,
        fontSize: 13,
        fontFamily: 'DMSans_500Medium'
    },

    footerWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center",
        elevation: 5, 
        backgroundColor: 'white', 
        padding: 16, 
        borderRadius: 8, 
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2, 
        shadowRadius: 4, 
    },

    textUrl: {
        marginLeft: 10, 
        fontFamily: 'DMSans_400Regular_Italic'
    }
})