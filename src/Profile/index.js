import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import Button from '../General/Button'

export default class Profile extends Component {
    static navigationOptions = {
        header: () => null
    }

    render() {
        return(
            <View>
                <Text>profile</Text>
                <Button title={'LOG OUT'} onPress={() => {
                    AsyncStorage.removeItem('token')
                    this.props.navigation.navigate('Splash')
                }} />
            </View>
        )
    }
}