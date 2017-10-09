import React from 'react'
import {
    TouchableOpacity,
    Text,
    View,
    FlatList,
    Image,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export const WideItem = ({title, subtitle, stars, imageUri, onPress}) => {

    const starData = []
    for (let i = 0; i < stars; i++){
        starData.push({key: i})
    }

    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Image source={{uri: imageUri}} style={styles.image} blurRadius={10}/>
            <View style={styles.overlay}/>

            <Text style={styles.title}>{title.toUpperCase()}</Text>
            <Text style={styles.subtitle}>{subtitle.toUpperCase()}</Text>
            <View style={{height: 15}}/>
            <FlatList 
                data={starData}
                horizontal
                style={styles.stars}
                renderItem={() => (
                    <Icon name={'ios-star'} size={18} color={'white'} style={{backgroundColor: 'transparent'}}/>
                )}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 115,
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
        fontSize: 20
    },
    subtitle: {
        backgroundColor: 'transparent',
        color: 'white',
        fontSize: 14
    },
    stars: {
        position: 'absolute',
        bottom: 22,
    }
})