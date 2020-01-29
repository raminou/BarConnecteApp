import React from 'react';
import { View, Text } from 'react-native';
import Ingredient from '../classes/Ingredient';
import Glass from '../classes/Glass';

const AVAILABLE_INGREDIENTS = [
    {name: 'grenadine', color: '#ff0000'},
    {name: 'lemonade', color: '#ffff00'},
    {name: 'water', color: '#0000ff'},
    {name: 'mint', color: '#ff0000'}
];

export default class MenuScreen extends React.Component {
    static navigationOptions = {
        title: 'Cocktail'
    };

    constructor(props) {
        super(props);

        let array_ingredients = [];
        for(let i = 0; i < AVAILABLE_INGREDIENTS.length; i++) {
            const ing = AVAILABLE_INGREDIENTS[i];

            let obj = {
                val: 0
            };
            obj.ingredient = <Ingredient
                color={ing.color}
                name={ing.name}
                value={obj.val}
                onValueChange={(value) => {
                    const ingredients = this.state.ingredients;
                    ingredients[i].value = value;
                    this.setState({ingredients});
                }}
            />;
            
            array_ingredients.push(obj);
        }

        this.state = {
            ingredients: array_ingredients
        };
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
                    {ingredient.ingredient}
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