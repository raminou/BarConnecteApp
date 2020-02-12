import React from 'react';
import { View, Text, Button, TouchableHighlight } from 'react-native';
import Ingredient from '../classes/Ingredient';
import Glass from '../classes/Glass';
import CocktailRequest from '../classes/CocktailRequest';
import { Icon } from 'react-native-elements';

const AVAILABLE_INGREDIENTS = [
    {name: 'grenadine', color: '#ff6666', backgroundColor: "#ff7f7f"},
    {name: 'mint', color: '#79c978', backgroundColor: "#8cd18b"},
    {name: 'lemonade', color: '#f3f9a1', backgroundColor: "#faffb2"},
    {name: 'water', color: '#cceef7', backgroundColor: "#d2f0f8"}
];

export default class MenuScreen extends React.Component {
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
            title: 'Cocktail',
            headerRight: () => (
                <TouchableHighlight
                    activeOpacity={1}
                    underlayColor="#dddddd"
                    style={{
                        padding: 20
                    }}
                    onPress={(params) => {
                        navigation.getParam('orderDrink')();
                    }}
                >
                    <Icon
                        type="material-community"
                        name="send"
                    />
                </TouchableHighlight>
            )
        };
    };

    constructor(props) {
        super(props);

        let array_ingredients = [];
        for(let i = 0; i < AVAILABLE_INGREDIENTS.length; i++) {
            const ing = AVAILABLE_INGREDIENTS[i];

            let obj = {
                value: 0,
                name: ing.name, 
                color: ing.color,
                backgroundColor: ing.backgroundColor
            };
            
            array_ingredients.push(obj);
        }

        this.state = {
            ingredients: array_ingredients,
            drinkOrdered: false,
        };
    }

    componentDidMount() {
        this.props.navigation.setParams({orderDrink: this._orderDrink});
    }

    _orderDrink = () => {
        const {navigate} = this.props.navigation;
        
        if(!this.state.drinkOrdered) {
            this.setState({drinkOrdered: true});
            setTimeout(() => this.setState({drinkOrdered: false}), 2000);
            let arr_ingredients = [];
            for(let i = 0; i < this.state.ingredients.length; i++) {
                const ingredient = this.state.ingredients[i];
                arr_ingredients.push({
                    name: ingredient.name,
                    value: ingredient.value
                });
            }

            global.cocktail_requests.push(new CocktailRequest({ingredients: arr_ingredients}));
            navigate('CocktailQueue', {});
        }
    }

    render() {
        let array_ingredients = [];
        for(let i = 0; i < this.state.ingredients.length; i++) {
            const ingredient = this.state.ingredients[i];
            array_ingredients.push(
                <View
                    key={i}
                    style={{
                        flexDirection: 'row',
                        flex: 1
                    }}
                >
                    <Ingredient
                        color={ingredient.color}
                        name={ingredient.name}
                        value={ingredient.value}
                        onValueChange={(value) => {
                            const ingredients = this.state.ingredients;
                            ingredients[i].value = value;
                            this.setState({ingredients});
                        }}
                    />
                </View>
            );
        }

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                alignItems: 'stretch',
                padding: 5
            }}>
                <View style={{
                    flex: 5
                }}>
                    <Text>Glass</Text>
                    <Glass ingredients={this.state.ingredients}/>
                </View>
                
                {/* Ingredients */}
                {array_ingredients}
            </View>
        );
    }
}