import React, { Component } from 'react'
import { 
    Text, 
    View, 
    FlatList, 
    ScrollView, 
    AsyncStorage, 
} from 'react-native'
import TextField from 'react-native-md-textinput'
import { createApolloFetch } from 'apollo-fetch'

import { SquareItem } from './ListItem'
import { Loading } from './General'

const keys = require('../keys.json')

const uri = 'https://api.yelp.com/v3/graphql'
const apolloFetch = createApolloFetch({ uri })

export default class Explore extends Component {
    static navigationOptions = {
        header: () => null
    }

    state = {
        search: '',
        searchData: [],
        statusHeight: 21,
    }

    componentWillMount() {
        AsyncStorage.getItem('yelp_token').then(token => {
            console.log(token)
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

    componentWillUpdate(nextProps, nextState) {
        if (nextState.ACCESS_TOKEN) {
            apolloFetch.use(({ request, options }, next) => {
                if (!options.headers) {
                    options.headers = {
                        'Accept-Language': 'en_CA'
                    } 
                }
                options.headers.Authorization = `Bearer ${nextState.ACCESS_TOKEN}`

                next()
            })
        }
        (this.state.ACCESS_TOKEN || 
            nextState.ACCESS_TOKEN) && 
                this.searchSubmit()
                console.log(this.state.searchData)
    }

    queryYelp = (query) => {
        return apolloFetch({ query }).then(({data}) => data)
    }

    searchSubmit = () => {
        this.searchYelp(this.state.search, this.props.user.address).then((res) => 
            res && 
            res.search && 
            res.search.business && 
            this.setState({searchData: res.search.business}))
    }

    searchYelp = (text, area) => this.queryYelp(`
        query {
            search(term: "${text}", location: "${area}", categories: "food", limit: 20) {
                total
                business {
                    name
                    location {
                        address1
                    }
                    rating
                    url
                    categories {
                        title
                    }
                    hours {
                        hours_type
                        open {
                            is_overnight
                            start
                            end
                            day
                        }
                        is_open_now
                    }
                    price
                    photos
                }
            }
        }
    `)
    
    render() {
        return (
            <View style={{backgroundColor: 'white', flex: 1}}>
                <View style={{height: 70, alignItems: 'center', justifyContent: 'center', padding: 20, paddingBottom: 5}}>
                    <Text style={{fontSize: 13, color: 'rgba(0,0,0,0.8)', }}>EXPLORE</Text>
                </View>
                {
                    this.state.searchData.length > 0 ? (
                        <ScrollView style={{backgroundColor: 'white'}}>
                            <View style={{marginTop: -10, paddingHorizontal: 20, paddingBottom: 20}}>
                                <TextField 
                                    label={'search'} 
                                    onChangeText={(text) => this.setState({search: text})} 
                                    value={this.state.search} 
                                    autoCorrect={false} 
                                    highlightColor={'black'} 
                                    onSubmitEditing={this.searchSubmit}
                                />
                            </View>
                            <FlatList 
                                data={this.state.searchData}
                                numColumns={3}
                                scrollable={false}
                                keyExtractor={(item, index) => index}
                                renderItem={({item}, index) => <SquareItem
                                    title={item.name}
                                    subtitle={item.location.address1}
                                    stars={item.rating}
                                    imageUri={item.photos[0]}
                                    onPress={(item) => null} //navigate
                                />}
                            />
                        </ScrollView>
                    ) : (
                        <Loading />
                    )
                }
            </View>
        )
    }
}