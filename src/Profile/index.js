import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class Profile extends Component {
    static navigationOptions = {
        header: () => null
    }

    render() {
        return(
            <View>
                <Text>profile</Text>
            </View>
        )
    }
}