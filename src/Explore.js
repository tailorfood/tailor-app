import React, { Component } from 'react'
import { Text, View, FlatList, ScrollView } from 'react-native'
import TextField from 'react-native-md-textinput'
import { SquareItem } from './ListItem'

const fakeData = require('./fake_data.json')

export default class Explore extends Component {
    static navigationOptions = {
        header: () => null
    }

    state = {
        search: ''
    }

    render() {
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
                            onChangeText={(text) => this.setState({password: text})} 
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