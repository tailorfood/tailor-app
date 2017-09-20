import React, { Component } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import TextField from 'react-native-md-textinput'
import Button from '../General/Button'

export default class SignIn extends Component {
    static navigationOptions = {
        // header: ({ goBack }) => <Icon name={'chevron-left'} onPress={ () => { goBack() } }/> })
    }
    render() {
        return(
            <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={styles.center}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../../images/tailor.png')}/>
                    <Text>SIGN IN    </Text>
                </View>
                <View style={{ padding: 40 }}>
                    <TextField label={'email'} highlightColor={'black'}/>
                    <TextField label={'password'} highlightColor={'black'}/>
                </View>
                <View style={styles.container}>
                    <Button title={'SIGN IN'} onPress={() => null}/>
                    <Button title={'SIGN IN WITH FACEBOOK'} onPress={() => null} facebook/>
                </View>
            </ScrollView>
        )
    }
}

export const styles = StyleSheet.create({
    center: {
        flex: 1,
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