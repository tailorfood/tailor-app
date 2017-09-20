// @f;pw
import React, { Component } from 'react'
import { View, Image, StyleSheet, Dimensions } from 'react-native'
import Button from '../General/Button'

export default class Splash extends Component {
    static navigationOptions = {
        title: 'Splash',
        header: () => null
    }

    render() {
        return(
            <View style={styles.center}>
                <Image style={styles.logo} source={require('../../images/tailor.png')}/>
                <Button title={'SIGN IN'} onPress={() => this.props.navigation.navigate('SignIn')}/>
                <Button title={'SIGN UP'} onPress={() => this.props.navigation.navigate('SignUp')}/>
            </View>
        )
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