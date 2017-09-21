import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Explore extends Component {
    static navigationOptions = {
        header: () => null
    }

    render() {
        return(
            <View>
                <Text>explore</Text>
            </View>
        )
    }
}