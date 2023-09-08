import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import { Image } from "expo-image";
import { useRouter, Link } from "expo-router";
import { COLORS } from "../../constant";
import { FlatList } from "react-native-gesture-handler";
import { getDictionary } from "../../app/hooks/useFetch";
import { useState, useEffect } from "react";

export default ExploreCard = ({ item, handleSearch, definition }) => {
    const router = useRouter()
    // const [definition, setDefinition] = useState('')
    
    const onPress = () => {
        router.push(`/access/${encodeURIComponent(JSON.stringify(item))}`)
    }

    return (
        <ImageBackground 
            source={{ uri : item.image }} 
            style={styles.image}
            imageStyle={{ borderRadius: 20 }}
        >
            <View style={styles.overlay} />

            <TouchableOpacity style={styles.container} onPress={() => onPress()} >
                <View style={styles.wrapper}>
                    <Text style={styles.itemTitle}>{item.title}</Text>
                </View>
            </TouchableOpacity>
        </ImageBackground>
    )
}

// brand guide (research)
// orange: #e87e04
// blue & light blue

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: 200,
        padding: 20,
        borderRadius: 20,
    },

    image: { height: 270, },

    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 20,
    },

    wrapper: {
        position: 'absolute',
        bottom: 0
    },

    itemTitle: {
        color: COLORS.white,
        fontFamily: 'DMSans_700Bold',
        fontSize: 25,
        padding: 20,
    },

    itemBody: {
        color: COLORS.white,
        marginTop: 17,
        fontFamily: 'DMSans_500Medium',
        fontSize: 12,
    }
})