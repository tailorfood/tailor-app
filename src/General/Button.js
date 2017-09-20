import React from 'react'
import { TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native'

export default ({ title, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            height: 48,
            margin: 10,
            width: Dimensions.get('window').width - 120,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderColor: 'black',
            borderWidth: StyleSheet.hairlineWidth
        }}>
            <Text style={{fontSize: 11}}>{title.toUpperCase()}</Text>
        </TouchableOpacity>
    )
}