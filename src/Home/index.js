import React, { Component } from 'react'
import { View, Text, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Button from '../General/Button'

//should be a tabview
export default class Home extends Component {
    static navigationOptions = {
        header: () => null
    }

    render() {
        return(
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{height: 90, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color: 'gray', paddingHorizontal: 10, fontSize: 13}}>123 ADDRESS ST.</Text>
                    <Icon name={'ios-arrow-down'} size={12} color={'gray'}/>
                </View>
                <Button title={'LOG OUT'} onPress={() => {
                    AsyncStorage.removeItem('token')
                    this.props.navigation.navigate('Splash')
                }} />
            </View>
        )
    }
}