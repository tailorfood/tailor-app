// @flow
import React, { Component } from 'react'
import { View, Image, StyleSheet, Dimensions, AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { Button, Loading } from './General'

const keys = require('../keys.json')

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Main' })
    ]
})

export default class Splash extends Component {
    static navigationOptions = {
        title: 'Splash',
        header: () => null
    }

    state = { visible: false }

    componentWillMount() {
        AsyncStorage.getItem('token').then((token) => {
            if (token) {
                //already logged in
                this.props.navigation.dispatch(resetAction)
                this.props.navigation.goBack(null)

                AsyncStorage.getItem('yelp_token').then((result) => {
                    if (result) {
                        console.log('token already exists')
                    } else {
                        const formData = new FormData()
                        formData.append("grant_type", "client_credentials")
                        formData.append('client_id', keys.YELP_ID)
                        formData.append('client_secret', keys.YELP_SECRET)
                        fetch(
                        'https://api.yelp.com/oauth2/token', {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: formData
                        }).then(res => res.json())
                        .then(res => {
                            AsyncStorage.setItem('yelp_token', res.access_token)
                        })
                    }
                }).catch(err => console.warn(err))
                
            } else {
                // invert comments on these to work in offline mode
                // __DEV__ && this.props.navigation.dispatch(resetAction)
                // __DEV__ && this.props.navigation.goBack(null)

                this.setState({ visible: true })
            }
        }).catch((err) => this.setState({ visible: true }))
    }

    render() {
        return this.state.visible ? (
            <View style={styles.center}>
                <Image style={styles.logo} source={require('../images/tailor.png')}/>
                <Button title={'SIGN IN'} onPress={() => this.props.navigation.navigate('SignIn')}/>
                <Button title={'SIGN UP'} onPress={() => this.props.navigation.navigate('SignUp')}/>
                { this.state.loading && <Loading/> }
            </View>
        ) : <View/>
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    logo: {
        height: 170,
        width: Dimensions.get('window').width - 120,
        resizeMode: 'contain'
    }
})

