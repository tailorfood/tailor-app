//@flow
import React from 'react'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'

import Home from '../Home'
import Explore from '../Explore'
import Profile from '../Profile'

import Splash from '../Splash'
import SignIn from '../SignIn'
import SignUp from '../SignUp'

const navRoutes = {
    Home: { screen: Home },
    Explore: { screen: Explore },
    Profile: { screen: Profile }
}

const routes = {
    Splash: { screen: Splash },
    SignIn: { screen: SignIn },
    SignUp: { screen: SignUp },
    Restaurant: { screen: () => null },
    Cuisine: { screen: () => null },
    ...navRoutes
}

export default StackNavigator(routes, {
    navigationOptions: {
        tintColor: 'black',
        headerTintColor: 'black',
        headerStyle: {
            backgroundColor: 'white',
            shadowOpacity: 0
        },
        titleStyle: { color: 'black' }
    }}
)
