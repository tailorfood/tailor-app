import React from 'react'
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'

export const SquareItem = ({title, subtitle, stars, imageUri, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image source={{uri: imageUri}} style={styles.image} blurRadius={10}/>
            <View style={styles.overlay}/>

            <Text style={styles.title}>{title.toUpperCase().substring(0, 26)}</Text>
            <Text style={styles.subtitle}>{subtitle.toUpperCase()}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').width / 3,
    },
    image: {
        flex: 1, 
        position: 'absolute', 
        height: '100%', 
        width: '100%'
    },
    overlay: {
        flex: 1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    title: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 16,
        textAlign: 'center'
    },
    subtitle: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 12
    },
    stars: {
        position: 'absolute',
        bottom: 22,
    }
})