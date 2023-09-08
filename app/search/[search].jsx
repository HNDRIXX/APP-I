import { useState, useEffect } from "react"
import { View, Text, SafeAreaView, StyleSheet, ScrollView} from "react-native"
import { useGlobalSearchParams } from "expo-router"
import { Image } from "expo-image"

import { getDictionary } from "../hooks/useFetch"
import { COLORS } from "../../constant"

export default SearchIndex = () => {
    const params = useGlobalSearchParams()
    const [searchDefinition, setSearchDefinition] = useState([])
    const [searchPhonetic, setSearchPhonetic] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    const handleWord = async () => {
        setIsLoading(true)

        try {
            const data = await getDictionary( params.search )

            const allDefinition = []
            const meanings = data[0].meanings || []

            meanings.forEach((meaning, meaningIndex) => {
                const definitions = meaning.definitions || [];
            
                definitions.forEach((wordData, definitionIndex) => {
                    allDefinition.push(wordData.definition + '\n')
                })
            })

            if (data.length > 0){
                const dataPhonetic = data[0].phonetic || []
                const dataDefinition = data[0].meanings[0].definitions[0].definition
                
                setSearchDefinition(allDefinition)
                setSearchPhonetic(dataPhonetic)
            } else {}
        } catch (error) {
            
        } finally { setIsLoading(false)}
    }
    
    useEffect(() => {
        if(isLoading){
            handleWord()
        }
    }, [setIsLoading])

    return (
        <SafeAreaView style={styles.container}>
            <Image 
                source={{ uri : 'https://picsum.photos/seed/696/3000/2000' }}
                style={{ width: '100%', height: 400 }}
                contentFit="cover" 
            />

            <View style={styles.textWrapper}>
                <Text style={styles.wordTitle}>{params.search}</Text>
                <Text style={styles.wordPhonetic}>{searchPhonetic}</Text>
            </View>

            <Text style={styles.definitionsTitle}>Definitions:</Text>

            <ScrollView style={styles.listDefinition} >
                {searchDefinition.map((item, index) => (
                    <View style={styles.definitionWrapper} key={index}>
                        <Text style={styles.wordDefinition}>{item}</Text>
                    </View>
                ))}
            </ScrollView>
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

    wordTitle: {
        fontFamily: 'DMSans_700Bold',
        color: COLORS.orange,
        fontSize: 40,
    },

    definitionsTitle: {
        paddingHorizontal: 20,
        fontFamily: 'DMSans_500Medium'
    },

    definitionWrapper: {
        backgroundColor: COLORS.lightGray2,
        borderTopColor: COLORS.orange,
        borderTopWidth: 3,
        marginVertical: 10,
        justifyContent: 'center',
    }, 

    wordPhonetic: {
        fontFamily: 'DMSans_500Medium',
    },

    wordDefinition: {
        padding: 20
    },

    listDefinition: {
        marginHorizontal: 20,
        flexGrow: 0,
    }
})