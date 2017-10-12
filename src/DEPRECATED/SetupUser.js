import React, { Component } from 'react'
import { 
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
import { gql, graphql } from 'react-apollo'
import { NavigationActions } from 'react-navigation'

import { Button } from './General'

class SetupUser extends Component {
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

    render() {
        return (
            <KeyboardAvoidingView style={{backgroundColor: 'white', flex: 1, justifyContent: 'center'}}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../images/tailor.png')}/>
                    <Text>SET UP    </Text>
                </View>
                <View style={{ padding: 20, paddingHorizontal: 40}}>
                    <TextField label={'address'} value={this.state.address} highlightColor={'black'} editable={false}/>
                    <TouchableOpacity style={{width: '100%', marginTop: -50, height: 50}} onPress={() => this.openSearchModal()}/>
                    <TextField label={'username'} onChangeText={(text) => this.setState({username: text})} value={this.state.username} autoCapitalize={"none"} autoCorrect={false} highlightColor={'black'}/>
                </View>
                <View style={styles.container}>
                    <Text style={{color: 'red'}}>{this.state.err}</Text>
                    <Button title={'FINISH SIGNING UP'} onPress={() => {
                        this.props.updateUser({
                            id: this.props.navigation.state.params.id, 
                            username: this.state.username,
                            address: this.state.address,
                        }).then(() => {
                            this.props.navigation.navigate('Main')
                            this.props.navigation.dispatch(NavigationActions.reset({index:0}))
                            this.props.navigation.goBack(null)
                        })
                    }}/>
                </View>
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


const UpdateUserMutation = graphql(gql`
    mutation UpdateUserMutation($id: ID!, $username: String!, $address: String!) {
        updateUser(
            id: $id,
            username: $username,
            address: $address
        ){  
            id
        }
    }
`, {
    props: ({ mutate }) => ({
        updateUser: ({ id, username, email, address }) => mutate({
            variables: { id, username, email, address }
        })
    })
})


export default UpdateUserMutation(SetupUser)