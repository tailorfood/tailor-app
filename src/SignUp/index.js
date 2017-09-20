import React, { Component } from 'react'
import { ScrollView, View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import TextField from 'react-native-md-textinput'
import Button from '../General/Button'
import { styles } from '../SignIn'

export default class SignUp extends Component {
    static navigationOptions = {
        // header: ({ goBack }) => <Icon name={'chevron-left'} onPress={ () => { goBack() } }/> })
    }
    render() {
        return(
            <ScrollView style={{backgroundColor: 'white'}} contentContainerStyle={styles.center}>
                <View style={styles.container}>
                    <Image style={styles.logo} source={require('../../images/tailor.png')}/>
                    <Text>SIGN UP    </Text>
                </View>
                <View style={{ padding: 40 }}>
                    <TextField label={'email'} highlightColor={'black'}/>
                    <TextField label={'password'} highlightColor={'black'}/>
                    <TextField label={'address'} highlightColor={'black'}/>
                    <TextField label={'name'} highlightColor={'black'}/>
                </View>
                <View style={styles.container}>
                    <Button title={'SIGN UP'} onPress={() => null}/>
                    <Button title={'SIGN UP WITH FACEBOOK'} onPress={() => null} facebook/>
                </View>
            </ScrollView>
        )
    }
}