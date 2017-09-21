import React from 'react'
import { View, TouchableOpacity, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

export default ({ visible }) => visible ? (
    <View style={{position: 'absolute', flex: 3, flexDirection: 'row', bottom: 0, width: '100%', height: 64, backgroundColor: 'white', shadowOpacity: 0.08}}>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Icon name={'ios-home'} color={'black'} size={36} />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Icon name={'ios-albums'} color={'black'} size={32} />
        </TouchableOpacity>
        <TouchableOpacity style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Icon name={'ios-person'} color={'black'} size={38} />
        </TouchableOpacity>
        <View style={{backgroundColor: 'black', height: 4, width: Dimensions.get('window').width/3, position: 'absolute', bottom: 0}}/>
    </View>
) : null