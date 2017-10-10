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
import Auth0 from 'react-native-auth0'

import { Button } from './General'

export default class SignUp extends Component {
    static navigationOptions = {
        header: () => null
    }

    state = {
        email: '',
        password: '',
        address: '',
        username: '',
        name: '',
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
        const keys = require('../keys.json')
        const auth0 = new Auth0({ domain: keys['AUTH_DOMAIN'], clientId: keys['AUTH_ID'] })
        auth0.auth
            .createUser({email: this.state.email, username: this.state.username, password: this.state.password, connection: 'Username-Password-Authentication'})
            .then((newUser) => {
                //newUser: {id: str, emailVerified: bool, email: str}
                console.log(newUser)
                const token = newUser.tokenType + ' ' + newUser.idToken
                AsyncStorage.setItem('token', token)
                //new user stuff, create apollo, set token to sign in
                this.props.navigation.navigate('Home')
            })
            .catch((err) => { 
                const errText = err.toString()
                this.setState({ err: errText.substring(errText.indexOf(":") + 1) }) 
            })
    }
    
    // <Button title={'SIGN UP WITH FACEBOOK'} onPress={() => null} facebook/>

    render() {
        return(
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
                        <TextField label={'name'} onChangeText={(text) => this.setState({name: text})} value={this.state.name} highlightColor={'black'}/>
                    </View>
                    <View style={styles.container}>
                        <Text style={{color: 'red'}}>{this.state.err}</Text>
                        <Button title={'SIGN UP'} onPress={() => this.createUser()}/>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{paddingVertical: 20, paddingHorizontal: 15, position: 'absolute', top: 0, left: 0}}>
                    <Icon name={'ios-arrow-back'} color={'black'} size={32} />
                </TouchableOpacity>
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