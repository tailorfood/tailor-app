import React, { Component } from 'react'
import { Text, View, FlatList, ScrollView, AsyncStorage } from 'react-native'
import TextField from 'react-native-md-textinput'
import { SquareItem } from './ListItem'

const fakeData = require('./fake_data.json')
const keys = require('../keys.json')

export default class Explore extends Component {
    static navigationOptions = {
        header: () => null
    }

    state = {
        search: ''
    }

    componentWillMount() {
        AsyncStorage.getItem('yelp_token').then(token => {
            if (token) {
                this.setState({ACCESS_TOKEN : token})
            } else {
                const formData = new FormData()
                formData.append("grant_type", "client_credentials")
                formData.append('client_id', keys.YELP_ID)
                formData.append('client_secret', keys.YELP_SECRET)
                fetch(
                'https://api.yelp.com/oauth2/token', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData
                }).then(res => res.json())
                .then(res => {
                    AsyncStorage.setItem('yelp_token', res.access_token)
                    this.setState({ACCESS_TOKEN: res.access_token})
                })
            }
        }).catch(err => console.warn(err))
    }

    queryYelp = (query) => this.state.ACCESS_TOKEN ? fetch(
        'https://api.yelp.com/v3/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/graphql',
                'Authorization': `Bearer ${this.state.ACCESS_TOKEN}`
            },
            body: query
        })
        .then((response) => console.log(response))
        : console.log("querying with no token")

    render() {
        console.log(this.state.ACCESS_TOKEN)
        // this.queryYelp(`
        //     {
        //         search(term: "burrito", location: "san francisco", limit: 5) {
        //             total
        //             business {
        //                 name
        //                 url
        //             }
        //         }
        //     }
        // `)
        return (
            <View>
                <View style={{height: 21, backgroundColor: 'white'}}/>
                <ScrollView style={{backgroundColor: 'white'}}>
                    <View style={{height: 20, alignItems: 'center', justifyContent: 'center', padding: 20, paddingBottom: 5}}>
                        <Text style={{fontSize: 13, color: 'rgba(0,0,0,0.8)', }}>EXPLORE</Text>
                    </View>
                    <View style={{paddingHorizontal: 20, paddingBottom: 20}}>
                        <TextField 
                            label={'search for cuisines or restaurants'} 
                            onChangeText={(text) => this.setState({search: text})} 
                            value={this.state.search} 
                            autoCorrect={false} 
                            highlightColor={'black'} 
                        />
                    </View>
                    <FlatList 
                        data={fakeData.explore}
                        numColumns={3}
                        scrollable={false}
                        keyExtractor={(item, index) => index}
                        renderItem={({item}, index) => <SquareItem {...item} subtitle={item.address} imageUri={`file:///Users/jacoberickson1/Desktop/tailor/images/${item.imageUri}`}/>}
                    />
                </ScrollView>
            </View>
        )
    }
}