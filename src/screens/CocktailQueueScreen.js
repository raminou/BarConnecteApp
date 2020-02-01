import React from 'react';
import { FlatList, ActivityIndicator, Text, View, Alert } from 'react-native';
import { List, ListItem } from 'react-native-elements';

export default class CocktailQueueScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: global.cocktail_requests,
            interval: setInterval(() => {
                this.setState({queue: global.cocktail_requests})
            }, 2000)
        };
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>
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
                                title={<Text style={{color, fontWeight }}>Test</Text>}
                                subtitle={item.last_status}
                                rightIcon={icon}
                                onPress={() => {
                                    Alert.alert("Drink", `Status: ${item.last_status}\nDate: ${item.date}`)}
                                }
                            />
                        );
                    }}
                >

                </FlatList>
            </View>
        );
    }
}