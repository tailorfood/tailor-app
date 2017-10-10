// @f;pw
import React, { Component } from 'react'
import { View, Image, StyleSheet, Dimensions, AsyncStorage } from 'react-native'
import Auth0 from 'react-native-auth0'
import { NavigationActions } from 'react-navigation'

import { Button, Loading } from '../General'

export default class Splash extends Component {
    static navigationOptions = {
        title: 'Splash',
        header: () => null
    }

    state = { loading: false, visible: false }

    signInUser() {
        setTimeout(() => this.setState({loading: true}), 1000)
        const keys = require('../../keys.json')
        const auth0 = new Auth0({ domain: keys['AUTH_DOMAIN'], clientId: keys['AUTH_ID'] })
        auth0.webAuth
            .authorize({scope: 'openid email', audience: 'https://jarus.auth0.com/userinfo'})
            .then(credentials => {
                __DEV__ && console.log(credentials)
                const token = credentials.tokenType + ' ' + credentials.idToken
                AsyncStorage.setItem('token', token) // might need to renew token at some point
                this.props.navigation.navigate('Home')
                this.setState({loading: false})
            })
            .catch(error => {
                console.log(error)
                this.setState({loading: false})
            })
    }
    componentWillMount() {
        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Main' })
            ]
        })
        AsyncStorage.getItem('token').then((token) => {
            if (token) {
                this.props.navigation.dispatch(resetAction)
                this.props.navigation.goBack(null)
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
                <Image style={styles.logo} source={require('../../images/tailor.png')}/>
                <Button title={'SIGN IN'} onPress={() => this.signInUser()}/>
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