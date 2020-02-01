import React from 'react';
import { TouchableOpacity, View, Text, Button } from 'react-native';
import { NavigationEvents } from 'react-navigation';

export default class MenuScreen extends React.Component {
    static navigationOptions = {
        title: 'Menu'
    };

    render() {
        const {navigate} = this.props.navigation;
        
        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                flexDirection: 'column',
                alignItems: 'stretch',
                padding: 5
            }}>
                <TouchableOpacity
                    onPress={() => navigate('CocktailQueue', {})}
                >
                    <View style={{
                        paddingHorizontal: 10,
                        alignItems: 'center',
                        borderColor: '#00ff00',
                        borderRadius: 5,
                        borderWidth: 1
                    }}>
                        <Text style={{
                            fontSize: 50
                        }}>Recipes</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('Cocktail', {})}
                >
                    <View style={{
                        paddingHorizontal: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#00ff00',
                        borderRadius: 5,
                        borderWidth: 1
                    }}>
                        <Text style={{
                            fontSize: 50
                        }}>Prepare your own drink</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate('CocktailQueue', {})}
                >
                    <View style={{
                        paddingHorizontal: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: '#00ff00',
                        borderRadius: 5,
                        borderWidth: 1
                    }}>
                        <Text style={{
                            fontSize: 50
                        }}>List</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}