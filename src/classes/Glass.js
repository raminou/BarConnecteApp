import React from 'react';
import { View } from 'react-native';
import {
    Svg,
    Polyline,
    Line
  } from 'react-native-svg';

export default class Glass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: props.ingredients
        };
    }

    render() {
        const height_start = 10;
        const margin_left = 30;
        const margin_right = 70;
        const points = `${margin_left},${height_start} ${margin_left},90 ${margin_right},90 ${margin_right},${height_start}`;
        const heightmax_glass = 80;

        let total = 0;
        for(let i = 0; i < this.props.ingredients.length; i++) {
            const ingredient = this.props.ingredients[i];
            
            total += ingredient.value;
        }

        let array_line_liquid = [];
        let height = height_start;
        if(total !== 0) {   
            for(let i = 0; i < this.props.ingredients.length; i++) {
                const ingredient = this.props.ingredients[i];

                if(ingredient.value !== 0) {
                    const add_height = ingredient.value * heightmax_glass / total;
                    height += add_height;

                    array_line_liquid.push(
                        <Line
                            x1={`${margin_left}`}
                            y1={`${height}`}
                            x2={`${margin_right}`}
                            y2={`${height}`}
                            stroke="red"
                            strokeWidth="2"
                        />
                    );
                }
            }
        }

        return (
            <View style={{flex: 1}}>
                <Svg
                    height="100%"
                    width="100%"
                    viewBox="0 0 100 100"
                >
                    <Polyline
                        points={points}
                        stroke="black"
                        fill="none"
                        strokeWidth="3"
                    />
                    {array_line_liquid}
                </Svg>
            </View>
        );
    }
};