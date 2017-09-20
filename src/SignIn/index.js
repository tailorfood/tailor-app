import React, { Component } from 'react'
import { 
    ScrollView, 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    Dimensions,
    TouchableOpacity 
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import TextField from 'react-native-md-textinput'
import Button from '../General/Button'

export default class SignIn extends Component {
    static navigationOptions = {
        header: () => null
    }
    
    render() {
        return(
            <View style={{backgroundColor: 'white', flex: 1}}>
                <ScrollView contentContainerStyle={styles.center}>
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
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{paddingVertical: 20, paddingHorizontal: 15, position: 'absolute', top: 0, left: 0}}>
                    <Icon name={'ios-arrow-back'} color={'black'} size={32} />
                </TouchableOpacity>
            </View>
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