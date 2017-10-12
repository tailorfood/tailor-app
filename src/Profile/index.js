import React, { Component } from 'react'
import { ScrollView, View,  AsyncStorage } from 'react-native'

import { Button, Loading } from '../General'
import ProfileHeader from './ProfileHeader'

export default class Profile extends Component {
    static navigationOptions = {
        header: () => null
    }

    render() {
        const {
            address,
            username
        } = this.props.user

        return (
            <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
                <ProfileHeader avatarUri={''} address={address} username={username}/>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Button title={'LOG OUT'} onPress={() => {
                        AsyncStorage.removeItem('token')
                        this.props.navigation.navigate('Splash')
                        this.props.navigation.goBack(null)
                    }} />
                </View>
            </ScrollView>
        )
    }
}