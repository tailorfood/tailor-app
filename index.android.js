//@flow
import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Main from './src'

export default class tailor extends Component {
    render() {
        return <Main />
    }
}

AppRegistry.registerComponent('tailor', () => tailor);
