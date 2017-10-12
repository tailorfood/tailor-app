import React, { Component } from 'react'
import { 
    ScrollView, 
    View, 
    KeyboardAvoidingView,
    Text, 
    Image, 
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import TextField from 'react-native-md-textinput'
import { gql, graphql } from 'react-apollo'
import { NavigationActions } from 'react-navigation'

import { Button } from './General'
import { styles } from './SignUpUser'
const keys = require('../keys.json')

class SignIn extends Component {
    static navigationOptions = {
        header: () => null
    }

    state = {
        email: '',
        password: '',
    }

    signInUser() {
        //check prior to this
        this.props.signinUser({ email: this.state.email, password: this.state.password })
        .then(({data: {signinUser: { user: {id}, token}}}) => {
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
    }

    render() {
        return (
            <KeyboardAvoidingView style={{backgroundColor: 'white', flex: 1}}>
                <ScrollView contentContainerStyle={[styles.center, {flex: 1}]}>
                    <View style={styles.container}>
                        <Image style={styles.logo} source={require('../images/tailor.png')}/>
                        <Text>SIGN IN    </Text>
                    </View>
                    <View style={{ padding: 30, paddingHorizontal: 40 }}>
                        <TextField label={'email'} onChangeText={(text) => this.setState({email: text})} value={this.state.email} highlightColor={'black'} autoCapitalize={"none"} autoCorrect={false}/>
                        <TextField label={'password'} onChangeText={(text) => this.setState({password: text})} value={this.state.password} highlightColor={'black'} autoCapitalize={"none"} autoCorrect={false} secureTextEntry />
                    </View>
                    <View style={styles.container}>
                        <Button title={'SIGN IN'} onPress={() => this.signInUser()}/>
                    </View>
                </ScrollView>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{paddingVertical: 20, paddingHorizontal: 15, position: 'absolute', top: 0, left: 0}}>
                    <Icon name={'ios-arrow-back'} color={'black'} size={32} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const SignInMutation = graphql(gql `
    mutation SignInMutation($email: String!, $password: String!) {
        signinUser(
            email: {
                email: $email, 
                password: $password
            },
        ) {
            user {
                id
            }
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

export default SignInMutation(SignIn)