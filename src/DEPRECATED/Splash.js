// @flow
import React, { Component } from 'react'
import { View, Image, StyleSheet, Dimensions, AsyncStorage } from 'react-native'
import Auth0 from 'react-native-auth0'
import { NavigationActions } from 'react-navigation'
import { gql, graphql, compose } from 'react-apollo'

import { Button, Loading } from './General'

const keys = require('../keys.json')

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'Main' })
    ]
})

class Splash extends Component {
    static navigationOptions = {
        title: 'Splash',
        header: () => null
    }

    state = { loading: false, visible: false }

    signinUser() {
        setTimeout(() => this.setState({loading: true}), 1000)
        
        const auth0 = new Auth0({ domain: keys.AUTH_DOMAIN, clientId: keys.AUTH_ID })
        auth0.webAuth
            .authorize({scope: 'openid email', audience: 'https://jarus.auth0.com/userinfo'})
            .then(credentials => {
                __DEV__ && console.log(credentials)
                const token = credentials.tokenType + ' ' + credentials.idToken

                this.props.createUser({
                    authId: credentials.idToken
                }).then(({createUser: {id}}) => {
                    AsyncStorage.setItem('token', token) // might need to renew token at some point
                    this.props.navigation.navigate('SetupUser', { id: id })
                    this.props.navigation.dispatch(NavigationActions.reset({index:0}))
                    this.props.navigation.goBack(null)

                    this.setState({loading: false})
                }).catch((err) => {
                    console.warn(err)
                    this.props.signinUser({
                        authId: credentials.idToken
                    }).then(({signinUser: {user: {id}}}) => {
                        AsyncStorage.setItem('token', token) // might need to renew token at some point
                        this.props.navigation.navigate('Main', { id: id })
                        this.props.navigation.dispatch(NavigationActions.reset({index:0}))
                        this.props.navigation.goBack(null)

                        this.setState({loading: false})
                    })
                })
                
            })
            .catch(error => {
                console.warn(error)
                this.setState({loading: false})
            })
    }

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
                <Button title={'SIGN IN / SIGN UP'} onPress={() => this.signinUser()}/>
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


const CreateUserMutation = graphql(gql`
    mutation CreateUserMutation($authId: String!) {
        createUser(
            authProvider: {
                auth0: {
                    idToken: $authId
                }
            }
        ){  
            id
        }
    }
`, {
    props: ({ mutate }) => ({
        createUser: ({ authId }) => mutate({
            variables: { authId },
            options: { fetchPolicy: 'network-only' }
        })
    })
})

const signinUserMutation = graphql(gql`
    mutation signinUserMutation($authId: String!) {
        signinUser(
            auth0: {
                idToken: $authId
            }
        ){  
            user {
                id
            }
        }
    }
`, {
    props: ({ mutate }) => ({
        signinUser: ({ authId }) => mutate({
            variables: { authId },
            options: { fetchPolicy: 'network-only' }
        })
    })
})


export default compose(CreateUserMutation, signinUserMutation)(Splash)