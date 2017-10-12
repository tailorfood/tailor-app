import React, { Component } from 'react'
import { 
    ScrollView, 
    View, 
    KeyboardAvoidingView,
    Text, 
    Image, 
    StyleSheet, 
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import RNGooglePlaces from 'react-native-google-places';
import TextField from 'react-native-md-textinput'
import { gql, graphql, compose } from 'react-apollo'
import { NavigationActions } from 'react-navigation'

import { Button, Loading } from './General'
const keys = require('../keys.json')

class SignUp extends Component {
    static navigationOptions = {
        header: () => null
    }

    state = {
        email: '',
        password: '',
        address: '',
        username: '',
        err: '',
    }

    openSearchModal() {
        RNGooglePlaces.openAutocompleteModal()
        .then((place) => {
            console.log(place)
            this.setState({address: place.address})
        })
        .catch(error => console.log(error.message))
    }

    createUser() {
        //check prior to this
        this.setState({ loading: true })
        this.props.createUser({
            email: this.state.email, 
            password: this.state.password, 
            username: this.state.username, 
            address: this.state.address
        }).then(({data: {createUser: {id}}}) => {
            this.props.signinUser({ email: this.state.email, password: this.state.password})
            .then(({data: {signinUser: {token}}}) => {
                this.setState({ loading: false })
                AsyncStorage.setItem('token', token)

                this.props.navigation.navigate('Main', {id: id})
                this.props.navigation.dispatch(NavigationActions.reset({index: 0}))
                this.props.navigation.goBack(null)

                AsyncStorage.getItem('yelp_token').then((yelp_token) => {
                    if (yelp_token) {
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
            })
        })
    }
    
    render() {
        return (
            <KeyboardAvoidingView style={{backgroundColor: 'white', flex: 1}}>
                <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={styles.center}>
                    <View style={[styles.container, {marginTop: 40}]}>
                        <Image style={styles.logo} source={require('../images/tailor.png')}/>
                        <Text>SIGN UP    </Text>
                    </View>
                    <View style={{ padding: 20, paddingHorizontal: 40 }}>
                        <TextField label={'email'} onChangeText={(text) => this.setState({email: text})} value={this.state.email} autoCapitalize={"none"} autoCorrect={false} highlightColor={'black'}/>
                        <TextField label={'password'} onChangeText={(text) => this.setState({password: text})} value={this.state.password} autoCapitalize={"none"} autoCorrect={false} highlightColor={'black'} secureTextEntry />
                        <TextField label={'address'} value={this.state.address} highlightColor={'black'} editable={false}/>
                        <TouchableOpacity style={{width: '100%', marginTop: -50, height: 50}} onPress={() => this.openSearchModal()}/>
                        <TextField label={'username'} onChangeText={(text) => this.setState({username: text})} autoCapitalize={"none"} autoCorrect={false} value={this.state.username} highlightColor={'black'}/>
                    </View>
                    <View style={styles.container}>
                        <Text style={{color: 'red'}}>{this.state.err}</Text>
                        <Button title={'SIGN UP'} onPress={() => this.createUser()}/>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{paddingVertical: 20, paddingHorizontal: 15, position: 'absolute', top: 0, left: 0}}>
                    <Icon name={'ios-arrow-back'} color={'black'} size={32} />
                </TouchableOpacity>
                { this.state.loading && <Loading /> }
            </KeyboardAvoidingView>
        )
    }
}

export const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    logo: {
        height: 80,
        width: 200,
        resizeMode: 'contain'
    }
})

const CreateUserMutation = graphql(gql `
    mutation CreateUserMutation($email: String!, $password: String!, $username: String!, $address: String!) {
        createUser(
            authProvider: {
                email: {
                    email: $email, 
                    password: $password
                }
            }, 
            username: $username, 
            address: $address
        ) {
            id
        }
    }
`, {
    props: ({ mutate }) => ({
        createUser: ({ email, password, username, address }) => mutate({
            variables: { email, password, username, address }
        })
    })
})

const SignInMutation = graphql(gql `
    mutation SignInMutation($email: String!, $password: String!) {
        signinUser(
            email: {
                email: $email, 
                password: $password
            },
        ) {
            token
        }
    }
`, {
    props: ({ mutate }) => ({
        signinUser: ({ email, password }) => mutate({
            variables: { email, password }
        })
    })
})

export default compose(CreateUserMutation, SignInMutation)(SignUp)