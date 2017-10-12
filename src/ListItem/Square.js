import React from 'react'
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    StyleSheet,
    Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const SquareItem = ({title, stars, imageUri, onPress}) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image source={{uri: imageUri}} style={styles.image} blurRadius={10}/>
            <View style={styles.overlay}/>

            <Text style={styles.title}>{title && title.toUpperCase().substring(0, 26) || ''}</Text>
            <View style={styles.starcontainer}>
                <Icon name={'ios-star'} size={18} color={'white'} style={{backgroundColor: 'transparent'}}/>
                <Text style={styles.subtitle}>{stars}</Text>
            </View>
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
    },
    starcontainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
    }
})