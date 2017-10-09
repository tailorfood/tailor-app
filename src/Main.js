import React, { Component } from 'react'

import Container from './Container'
import Home from './Home'
import Explore from './Explore'
import Profile from './Profile'

export default class Main extends Component {
    static navigationOptions = {
        header: () => null
    }
    render() {
        return (
            <Container index={
                this.props.navigation.state.params && 
                this.props.navigation.state.params.index || 0
            }>
                <Home />
                <Explore />
                <Profile />
            </Container>
        )
    }
}