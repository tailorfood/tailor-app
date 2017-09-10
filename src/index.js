//@flow
import React from 'react'
import { View } from 'react-native'
import { ApolloProvider } from 'react-apollo'
import { Provider } from 'react-redux'

import client from './Apollo'
import store from './ReduxStore'

import Apollo from './Apollo'
import Navigation from './Navigation'
import NavBar from './NavBar'

export default () => (
    <ApolloProvider client={ client }>
        <Provider store={ store }>
            <View style={{ flex: 1 }}>
                <Navigation/>
                <NavBar/>
            </View>
        <Provider/>
    <ApolloProvider/>
)
