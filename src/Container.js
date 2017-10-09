import React, { Component } from 'react'
import { Dimensions, View } from 'react-native'
import {
    TabViewAnimated,
    TabBar
} from 'react-native-tab-view'
import Icon from 'react-native-vector-icons/Ionicons'

export default class Container extends Component {
    state = {
        index: 0,
        routes: [
            { key: '0', title: 'Home', icon: 'ios-home' },
            { key: '1', title: 'Explore', icon: 'ios-albums' },
            { key: '2', title: 'Profile', icon: 'ios-person' }
        ],
    }

    renderIcon = ({ route, focused }) => (
        <View style={{
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Icon
                size={26}
                style={{ marginVertical: 5, opacity: focused ? 1 : 0.7 }}
                color={'black'}
                name={route.icon}
            />
        </View>
    )

    renderFooter = (props) => (
        <TabBar
            renderLabel={() => null}
            style={{backgroundColor: 'white'}}
            tabStyle={{flex: 1}}
            indicatorStyle={{backgroundColor: 'black'}}
            renderIcon={this.renderIcon}
            {...props}
        />
    )

    handleChangeTab = index => this.setState({
        index
    })

    render() {
        return (
            <TabViewAnimated 
                lazy={false}
                initialLayout={{height: 0, width: Dimensions.get('window').width}}
                navigationState={this.state}
                style={{height: Dimensions.get('window').height }}
                renderScene={({ route: { key } }) => this.props.children[key]}
                renderFooter={this.renderFooter}
                onIndexChange={this.handleChangeTab}
            />
        )
    }
}