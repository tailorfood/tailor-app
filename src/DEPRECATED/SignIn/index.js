// //DEPRECATED -- of use later when switching signin method

// import React, { Component } from 'react'
// import { 
//     ScrollView, 
//     View, 
//     KeyboardAvoidingView,
//     Text, 
//     Image, 
//     StyleSheet, 
//     Dimensions,
//     TouchableOpacity 
// } from 'react-native'
// import Icon from 'react-native-vector-icons/Ionicons'
// import TextField from 'react-native-md-textinput'
// import Auth0 from 'react-native-auth0'

// import Button from '../General/Button'
// import { styles } from '../SignUp'

// export default class SignIn extends Component {
//     static navigationOptions = {
//         header: () => null
//     }

//     state = {
//         email: '',
//         password: '',
//     }

//     signInUser() {
//         const keys = require('../../keys.json')
//         const auth0 = new Auth0({ domain: keys['AUTH_DOMAIN'], clientId: keys['AUTH_ID'] })
//         console.log(auth0.auth)
//         auth0.auth
//             .authorize({email: this.state.email, password: this.state.password, audience: 'https://jarus.auth0.com/userinfo'})
//             .then(credentials => console.log(credentials))
//             .catch(error => console.log(error));
//     }

//     // <Button title={'SIGN IN WITH FACEBOOK'} onPress={() => null} facebook/>

//     render() {
//         return(
//             <KeyboardAvoidingView style={{backgroundColor: 'white', flex: 1}}>
//                 <ScrollView contentContainerStyle={[styles.center, {flex: 1}]}>
//                     <View style={styles.container}>
//                         <Image style={styles.logo} source={require('../../images/tailor.png')}/>
//                         <Text>SIGN IN    </Text>
//                     </View>
//                     <View style={{ padding: 30, paddingHorizontal: 40 }}>
//                         <TextField label={'email/username'} onChangeText={(text) => this.setState({email: text})} value={this.state.email} highlightColor={'black'} autoCapitalize={"none"} autoCorrect={false}/>
//                         <TextField label={'password'} onChangeText={(text) => this.setState({password: text})} value={this.state.password} highlightColor={'black'} autoCapitalize={"none"} autoCorrect={false} secureTextEntry />
//                     </View>
//                     <View style={styles.container}>
//                         <Button title={'SIGN IN'} onPress={() => this.signInUser()}/>
//                     </View>
//                 </ScrollView>
//                 <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{paddingVertical: 20, paddingHorizontal: 15, position: 'absolute', top: 0, left: 0}}>
//                     <Icon name={'ios-arrow-back'} color={'black'} size={32} />
//                 </TouchableOpacity>
//             </KeyboardAvoidingView>
//         )
//     }
// }