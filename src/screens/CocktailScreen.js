import React from 'react';
import { View, Text, ToastAndroid, TouchableHighlight } from 'react-native';
import Ingredient from '../classes/Ingredient';
import Glass from '../classes/Glass';
import CocktailRequest from '../classes/CocktailRequest';
import { Icon } from 'react-native-elements';

import Sound from 'react-native-sound';

const AVAILABLE_INGREDIENTS = [
    {name: 'grenadine', color: '#ff6666', backgroundColor: "#ff7f7f"},
    {name: 'mint', color: '#79c978', backgroundColor: "#8cd18b"},
    {name: 'lemonade', color: '#f3f9a1', backgroundColor: "#faffb2"},
    {name: 'water', color: '#cceef7', backgroundColor: "#d2f0f8"}
];

function playSound() {
    Sound.setCategory('Playback');
 
    // Load the sound file 'whoosh.mp3' from the app bundle
    // See notes below about preloading sounds within initialization code below.
    var whoosh = new Sound('jai_soif.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('failed to load the sound', error);
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + whoosh.getDuration() + 'number of channels: ' + whoosh.getNumberOfChannels());
     
      // Play the sound with an onEnd callback
      whoosh.play((success) => {
        if (success) {
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
}

  
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
                        try {
                            navigation.getParam('orderDrink')(params);
                        }
                        catch(error) {
                            console.log("error");
                        }
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

    _orderDrink = (params) => {
        console.log("params:")
        console.log(params);
        const {navigate} = this.props.navigation;

        if(!this.state.drinkOrdered) {
            let total = 0;
            for(let i = 0; i < this.state.ingredients.length; i++) {
                const ingredient = this.state.ingredients[i];
                total += ingredient.value;
            }
        
            if(total > 100) {
                // Modify values
                ToastAndroid.show('The glass cannot contains as much', ToastAndroid.SHORT);
                const ingredients = this.state.ingredients
                for(let i = 0; i < ingredients.length; i++) {
                    const ingredient = ingredients[i];
                    ingredient.value = Math.round(ingredient.value/total * 100);
                }

                this.setState({ingredients});
            }
            else {
                // Send request
                this.setState({drinkOrdered: true});
                setTimeout(() => this.setState({drinkOrdered: false}), 2000);

                playSound();
                let arr_ingredients = [];
                for(let i = 0; i < this.state.ingredients.length; i++) {
                    const ingredient = this.state.ingredients[i];
                    arr_ingredients.push({
                        name: ingredient.name,
                        value: ingredient.value
                    });
                }
                console.log("Create cocktail request");

                global.cocktail_requests.push(new CocktailRequest({ingredients: arr_ingredients}, (valid) => {
                    if(valid)
                    {
                        navigate('CocktailQueue', {});
                        console.log("Valid");
                    }
                    else
                        console.log("Invalid");
                }));
            }
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