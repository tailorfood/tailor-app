import React, { Component } from 'react'
import { 
    View, 
    Text, 
    ScrollView,
    FlatList,
    StyleSheet,
    RefreshControl
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { WideItem } from './ListItem'
import { Loading } from './General'

const fakeData = require('./fake_data.json')

//should be a tabview
export default class Home extends Component {
    static navigationOptions = {
        header: () => null
    }

    state = {
        refreshing: false
    }

    dropDown = () => {
        console.log('dropdown!')
        // change address
    }

    onRefresh = () => {
        console.log('refresh!')
        // get new recommendations
    }

    render() {
        if (!this.props.user || this.props.user.loading) {
            return <Loading />
        }

        const {
            address
        } = this.props.user

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.subheader}>
                        <Text style={styles.headertext}>{address.toUpperCase()}</Text>
                        <Icon name={'ios-arrow-down'} size={12} color={'rgba(0,0,0,0.8)'} style={{backgroundColor: 'transparent'}} onPress={() => this.dropDown()}/>
                    </View>
                </View>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                >
                    <View style={styles.scrollheader}>
                        <Text style={styles.scrollheadertext}>OUR RECOMMENDATIONS</Text>
                    </View>
                    <FlatList 
                        data={fakeData.recommendations}
                        scrollable={false}
                        keyExtractor={(item, index) => index}
                        renderItem={({item}, index) => <WideItem {...item} subtitle={item.address} imageUri={`file:///Users/jacoberickson1/Desktop/tailor/images/${item.imageUri}`}/>}
                    />
                    <View style={styles.scrollheader}>
                        <Text style={styles.scrollheadertext}>POPULAR IN YOUR AREA</Text>
                    </View>
                    <FlatList 
                        data={fakeData.popular}
                        scrollable={false}
                        keyExtractor={(item, index) => index}
                        renderItem={({item}, index) => <WideItem {...item} subtitle={item.address} imageUri={`file:///Users/jacoberickson1/Desktop/tailor/images/${item.imageUri}`}/>}
                    />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: 'white'
    },
    header: {
        height: 70, 
        width: '100%', 
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    subheader: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row', 
        position: 'absolute', 
        bottom: 20
    },
    headertext: {
        color: 'rgba(0,0,0,0.8)', 
        paddingHorizontal: 10, 
        fontSize: 13, 
        backgroundColor: 'transparent'
    },
    scrollheader: {
        width: '100%', 
        height: 30, 
        backgroundColor: 'rgba(0,0,0,0.01)', 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    scrollheadertext: {
        color: 'rgba(0,0,0,0.8)', 
        paddingHorizontal: 10, 
        fontSize: 11, 
        backgroundColor: 'transparent'
    }
})