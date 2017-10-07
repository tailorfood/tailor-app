import React, { Component } from 'react'
import { 
    View, 
    Text, 
    ScrollView,
    FlatList 
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import ListItem from '../ListItem'

const fakeData = require('./fake_data.json')

//should be a tabview
export default class Home extends Component {
    static navigationOptions = {
        header: () => null
    }

    dropDown = () => {
        console.log('dropdown!')
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={{height: 70, width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', position: 'absolute', bottom: 20}}>
                        <Text style={{color: 'gray', paddingHorizontal: 10, fontSize: 13, backgroundColor: 'transparent'}}>123 ADDRESS ST.</Text>
                        <Icon name={'ios-arrow-down'} size={12} color={'gray'} style={{backgroundColor: 'transparent'}} onPress={() => this.dropDown()}/>
                    </View>
                </View>
                <ScrollView>
                    <FlatList 
                        data={fakeData.recommendations}
                        keyExtractor={(item, index) => index}
                        renderItem={({item}, index) => <ListItem {...item} imageUri={`file:///Users/jacoberickson1/Desktop/tailor/images/${item.imageUri}`}/>}
                    />
                </ScrollView>
            </View>
        )
    }
}