//@flow
import React from 'react'
import { View, AsyncStorage } from 'react-native'
import { ApolloProvider } from 'react-apollo'

import client from './Apollo'
import Navigation from './Navigation'

export default () => {
    return (
        <ApolloProvider client={ client }>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <Navigation/>
            </View>
        </ApolloProvider>
    )
}
