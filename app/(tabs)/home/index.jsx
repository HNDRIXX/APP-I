import { View, Text, SafeAreaView, StyleSheet, ActivityIndicator, FlatList, ScrollView, TextInput, Button, Keyboard, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter, Link } from "expo-router";

import { COLORS, useFonts } from "../../../constant";

import ExploreCard from "../../../components/card/ExploreCard";
import { useEffect, useState } from "react";
import { getDictionary } from "../../hooks/useFetch";
import { Ionicons } from "@expo/vector-icons";

const data = [
    { 
        'title': 'Explore',
        // 'image': 'https://shorturl.at/sBQ59'
        'image': 'https://shorturl.at/LPQT6'
    },
    { 
        'title': 'Success',
        'image': 'https://shorturl.at/aoqJ1'
    },
    { 
        'title': 'Manage',
        'image': 'https://shorturl.at/pzKM3'
    },
    { 
        'title': 'Engage',
        'image': 'https://shorturl.at/kqsyT'
    },
    { 
        'title': 'Achieve',
        'image': 'https://shorturl.at/bxGZ8'
    },
    { 
        'title': 'Fresh',
        'image': 'https://shorturl.at/cCRT9'
    }
]

export default HomeIndex = () => {
    const [fontsLoaded] = useFonts()
    const router = useRouter()

    const [wordInput, setWordInput] = useState('Greatest')
    const [searchWord, setSearchWord] = useState("")
    const [highWordDef, setHighWordDef] = useState("")
    const [highWordNetic, setHighWordNetic] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const fontCheck = async () => (
        <ActivityIndicator size={"large"} color={COLORS.orange} style={styles.appLoader} />
    )
    
    // if (!fontsLoaded) {
    //     return (
    //         <ActivityIndicator size={"large"} color={COLORS.orange} style={styles.appLoader} />
    //     )
    // }

    // const addData = (data) => {
    //     setHighWordData([...highWordData, data])
    // }

    const handleWord = async () => {
        setIsLoading(true)
        const data = await getDictionary( wordInput )

        if(data.length > 0){
            const dataPhonetic = data[0].phonetic || []
            const dataDefinition = data[0].meanings[0].definitions[0].definition
            
            setHighWordNetic(dataPhonetic)
            setHighWordDef(dataDefinition)
            setIsLoading(false)
        }else{ setHighWordDef("Search Word is Not Found") }
    }

    const handleSearch = () => {
        router.push(`/search/${searchWord}`)
    }


    useEffect(() => {
        handleWord()
    }, [setHighWordNetic, setHighWordDef])
    
    return (
        <SafeAreaView style={styles.container}>
            { fontsLoaded ? (
                <>
                    <View style={styles.welcomeWrapper}>
                        <Text style={styles.textMain}>Hello!</Text>
                        <Text style={styles.textSubMain}>This is a sample app.</Text>

                        <View style={styles.searchWrapper}>
                            <TextInput style={styles.searchInput} placeholder="Search..." onChangeText={(text) => setSearchWord(text)} value={searchWord} />

                            <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                                <Ionicons name="search-outline" color={COLORS.white} size={20}/>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <FlatList 
                            data={data}
                            renderItem={({ item }) => (
                                <ExploreCard 
                                    item={item}
                                    definition={highWordDef}
                                />
                            )}
                            contentContainerStyle={{ columnGap: 10 }}
                            style={{ flexGrow: 0 }}
                            horizontal
                        />
                    </View>

                    <View style={styles.sectionWrapper}>
                        <Text style={styles.sectionTitle}>Highlighted Word</Text>
                        <Text style={styles.sectionBody}>Let's check the highlighted word.</Text>
                    </View>

                    <View style={styles.highlightedTextWrapper}>
                        { isLoading ? (
                            <ActivityIndicator size={"large"} color={COLORS.orange} style={styles.appLoader} />
                        ) : (
                            <>
                                <View>
                                    <Text style={styles.highlightedWord}>{wordInput}</Text>
                                    <Text style={styles.highlightedPhonetics}>{highWordNetic}</Text>
                                </View>
                                
                                <View styles={styles.highlightedDefinition}>
                                    <Text style={styles.highlightedDefinition}>{highWordDef}</Text>
                                </View>
                            </>
                        )}
                    </View>
                </>
            ) : ( <ActivityIndicator size={"large"} color={COLORS.orange} style={styles.appLoader} /> )}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15
    },

    appLoader: {
        flex: 1, 
        justifyContent: "center"
    },

    welcomeWrapper: {
        marginVertical: 15,
    },

    textMain : {
        color: COLORS.orange,
        fontFamily: 'DMSans_700Bold',
        fontSize: 35,
        letterSpacing: -1.5,
    }, 

    textSubMain: {
        fontFamily: 'DMSans_500Medium'
    },

    searchWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        overflow: 'hidden'
    },

    searchButton: {
        marginTop: 10,
        marginLeft: 10,
        backgroundColor: COLORS.orange,
        alignItems: 'center',
        padding: 13,
        borderRadius: 10,
    },

    searchInput: {
        width: '85%',
        padding: 5,
        marginVertical: 10,
        marginBottom: 1,
        paddingHorizontal: 15,
        borderRadius: 8,
        backgroundColor: COLORS.lightGray,
    },

    sectionWrapper: {
        marginVertical: 15,
    },

    sectionTitle: {
        color: COLORS.orange,
        fontFamily: 'DMSans_700Bold',
        fontSize: 35,
        letterSpacing: -1.5
    },

    sectionBody: { fontFamily: 'DMSans_500Medium' },

    listedWrapper: {
        padding: 50,
        borderRadius: 10,
        backgroundColor: COLORS.lightGray,
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderColor: COLORS.gray,
        borderWidth: 3,
    },

    listedTitle: {
        fontSize: 22,
        fontFamily: 'DMSans_500Medium',
    },

    listedBody: {
        fontSize: 13,
    },

    highlightedTextWrapper: {
        borderColor: COLORS.lightOrange,
        borderWidth: 2,
        flexGrow: 1,
        padding: 20,
        borderRadius: 20
    },

    highlightedWord: {
        fontFamily: 'DMSans_500Medium_Italic',
        fontSize: 30,
    },

    highlightedPhonetics: {
        fontFamily: 'DMSans_500Medium',
    },

    highlightedDefinition: {
        paddingTop: 20
    },
})