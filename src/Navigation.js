//@flow
import { StackNavigator } from 'react-navigation'

import Main from './Main'
import Splash from './Splash'
import SignInUser from './SignInUser'
import SignUpUser from './SignUpUser'

const navRoutes = {
    Main: { screen: Main },
}

const routes = {
    Splash: { screen: Splash },
    SignIn: { screen: SignInUser },
    SignUp: { screen: SignUpUser },
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
