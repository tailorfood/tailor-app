import React, { Component } from 'react'
import { ScrollView, View,  AsyncStorage } from 'react-native'
import { Button } from '../General'
import ProfileHeader from './ProfileHeader'

const fakeData = require('../fake_data.json')

export default class Profile extends Component {
    static navigationOptions = {
        header: () => null
    }

    render() {
        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <ProfileHeader {...fakeData.profile}/>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Button title={'LOG OUT'} onPress={() => {
                        AsyncStorage.removeItem('token')
                        this.props.navigation.navigate('Splash')
                    }} />
                </View>
            </ScrollView>
        )
    }
}