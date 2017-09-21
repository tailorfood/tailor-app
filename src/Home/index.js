import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Home extends Component {
    static navigationOptions = {
        header: () => null
    }

    render() {
        return(
            <View>
                <Text>home</Text>
            </View>
        )
    }
}