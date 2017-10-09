import React from 'react'
import {
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


export default ({ avatarUri, name, address }) => {
    return (
        <View style={{height: 200, width: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
            <View style={{margin: 15, height: 80, width: 80, borderRadius: 40, backgroundColor: 'rgba(0,0,0,0.1)', alignItems: 'center', justifyContent: 'center'}}>
                {
                    avatarUri ? (
                        <Image source={{uri: avatarUri}} style={{height: 80, width: 80, borderRadius: 40}}/>
                    ) : <Icon name={'ios-person'} size={80} color={'gray'}/>
                }
            </View>
            <Text style={{fontSize: 20, color: 'rgba(0,0,0,0.8)'}}>{name.toUpperCase()}</Text>
            <Text style={{fontSize: 13, color: 'gray'}}>{address.toUpperCase()}</Text>
        </View>
    )
}