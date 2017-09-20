import React from 'react'
import { TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native'

export default ({ title, onPress, facebook }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{
            height: 48,
            margin: 10,
            width: Dimensions.get('window').width - 120,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: facebook ? '#3B5998' : 'white',
            borderColor: facebook ? '#3B5998' : 'black',
            borderWidth: StyleSheet.hairlineWidth
        }}>
            <Text style={{fontSize: 11, color: facebook ? 'white' : 'black'}}>{title.toUpperCase()}</Text>
        </TouchableOpacity>
    )
}