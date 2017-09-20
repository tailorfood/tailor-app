//@flow
import React from 'react'
import { View } from 'react-native'
import { ApolloProvider } from 'react-apollo'

import client from './Apollo'
import Navigation from './Navigation'
import NavBar from './NavBar'

export default () => (
    <ApolloProvider client={ client }>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Navigation/>
            <NavBar/>
        </View>
    </ApolloProvider>
)
