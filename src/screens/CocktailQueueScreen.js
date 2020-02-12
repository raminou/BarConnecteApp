import React from 'react';
import moment from 'moment';
import { ToastAndroid, TouchableHighlight, FlatList, ActivityIndicator, Text, View, Alert } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Icon } from 'react-native-elements';

moment.locale('fr');

export default class CocktailQueueScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        /*
        <Icon
                name="cocktail"
                type="font-awesome"
                onPress={(params) => {
                    navigation.getParam('orderDrink')();
                }}
                />*/
        return {
            title: 'Cocktail status',
            headerRight: () => (
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="#dddddd"
                    style={{
                        padding: 20
                    }}
                    onPress={(params) => {
                        navigation.getParam('deleteAll')();
                    }}
                >
                    <Icon
                        type="material-community"
                        name="trash-can-outline"
                    />
                </TouchableHighlight>
            )
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            queue: [{date: 1581350690594, last_status: "queue"}],
        };

        this.interval = setInterval(() => {
            // this.setState({queue: this._copyAll()})
            const {queue} = this.state;
            queue.push({date: 1581350690594, last_status: "queue"});
            this.setState({queue})
        }, 1000)
    }

    componentDidMount() {
        this.props.navigation.setParams({deleteAll: this._deleteAll});
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    _copyAll() {
        /*let array = global.cocktail_requests.map((item) => {return {date: item.date, last_status: item.last_status}});
        console.log(array);*/
        let array = [{date: 0, last_status: "queue"}]
        return array;
    }

    _deleteAll() {
        // global.cocktail_requests = [];
        // ToastAndroid.show('Your cocktail list has been empty !', ToastAndroid.SHORT);
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <View 
                    style={{
                        margin: 5,
                        alignItems: 'center'
                    }}
                >
                    <Text> cocktails asked</Text>
                </View>{/*
                <FlatList
                    data={this.state.queue.sort((a, b) => b.date-a.date).map((value, index) => {
                        value.key = `${index}`;
                        return value;
                    })}
                    renderItem={({item}) => {
                        let color = "#000000";
                        let fontWeight = "normal";
                        let icon = null;

                        switch(item.last_status) {
                            case "queue":
                                color = "#ff5733";
                                icon = <ActivityIndicator/>;
                                break;
                            case "prepare":
                                color = "#c5ee57";
                                icon = <ActivityIndicator/>;
                                break;
                            case "done":
                                color = "#00ff00";
                                fontWeight = "bold";
                                icon = <ActivityIndicator/>;
                                break;
                            case "served":
                                color = "#00ff00";
                                break;
                            case "error":
                            default:
                                color = "#ff0000";
                        }
                        
                        return (
                            <ListItem
                                title={<Text style={{color, fontWeight }}>{item.last_status}</Text>}
                                subtitle={moment(item.date).fromNow()}
                                rightIcon={icon}
                                onPress={() => {
                                    Alert.alert("Drink", `Status: ${item.last_status}\nDate: ${moment(item.date).format("DD/MM/YYYY HH:mm")}`)}
                                }
                            />
                        );
                    }}
                >

                </FlatList>*/}
            </View>
        );
    }
}