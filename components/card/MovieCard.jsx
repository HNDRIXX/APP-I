import { useState, useEffect, useCallback } from 'react'
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity, ImageBackground } from 'react-native'
import { Image } from 'expo-image'
import { COLORS } from '../../constant'

import { useRouter } from 'expo-router'

export default function MovieCard({ data }) {
    const router = useRouter()

    const onPress = () => {
        router.push(`/page/${encodeURIComponent(JSON.stringify(data))}`)
    }

    return ( 
        <TouchableOpacity style={ styles.container } onPress={() => onPress()}>
            <ImageBackground
                source={{ uri: data.imageUrl }}
                resizeMode='cover'
                borderRadius={10}
                style={styles.image}
            >
                <View style={styles.overlay} />

                <View style={ styles.wrapper }>
                    <View style={styles.textWrapper}>
                        <Text style={styles.textTitle}>{data.title}</Text>
                        <Text style={styles.textDate}>{data.releaseDate}</Text>
                    </View>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 250,
    },
    
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 7,
    },

    container: {
        borderRadius: 10
        // padding: 15,
    },

    wrapper: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        padding: 15
    },

    textTitle: {
        fontFamily: 'DMSans_500Medium',
        flexDirection: 'column',
        color: COLORS.white,
        fontSize: 19,
        lineHeight: 19,
    },

    textDate: {
        fontFamily: 'DMSans_400Regular',
        color: COLORS.white,
        fontSize: 13,
    },

    
    
})
