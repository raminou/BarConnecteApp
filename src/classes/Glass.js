import React from 'react';
import { View } from 'react-native';
import {
    Svg,
    Polyline,
    Line,
    Rect
  } from 'react-native-svg';

export default class Glass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ingredients: props.ingredients
        };
    }

    render() {
        const STROKE_WIDTH_LIQUID = 1;
        const STROKE_WIDTH_GLASS = 2;
        const height_start = 10;
        const margin_left = 30;
        const margin_right = 70;
        const points = `${margin_left},${height_start-2} ${margin_left},90 ${margin_right},90 ${margin_right},${height_start-2}`;
        const heightmax_glass = 80;

        let total = 0;
        for(let i = 0; i < this.props.ingredients.length; i++) {
            const ingredient = this.props.ingredients[i];
            
            total += ingredient.value;
        }

        let array_line_liquid = [];
        let array_rect_liquid = [];
        let height = height_start + heightmax_glass;

        if(total !== 0 && total > 100) {
            for(let i = 0; i < this.props.ingredients.length; i++) {
                const ingredient = this.props.ingredients[i];

                if(ingredient.value !== 0) {
                    const add_height = ingredient.value / total * heightmax_glass;
                    const old_height = height;
                    height -= add_height;

                    array_line_liquid.push(
                        <Line
                            key={i}
                            x1={`${margin_left}`}
                            y1={`${height}`}
                            x2={`${margin_right}`}
                            y2={`${height}`}
                            stroke={`${ingredient.color}`}
                            strokeWidth={`${STROKE_WIDTH_LIQUID}`}
                        />
                    );
                    array_rect_liquid.push(
                        <Rect
                            key={i}
                            x={margin_left}
                            y={height}
                            width={margin_right-margin_left}
                            height={old_height-height - STROKE_WIDTH_LIQUID/2}
                            fill={ingredient.backgroundColor}
                        />
                    );
                }
            }
        }
        else {
            for(let i = 0; i < this.props.ingredients.length; i++) {
                const ingredient = this.props.ingredients[i];

                if(ingredient.value !== 0) {
                    const add_height = ingredient.value / 100 * heightmax_glass;
                    const old_height = height;
                    height -= add_height;

                    array_line_liquid.push(
                        <Line
                            key={i}
                            x1={`${margin_left}`}
                            y1={`${height}`}
                            x2={`${margin_right}`}
                            y2={`${height}`}
                            stroke={`${ingredient.color}`}
                            strokeWidth={`${STROKE_WIDTH_LIQUID}`}
                        />
                    );
                    array_rect_liquid.push(
                        <Rect
                            key={i}
                            x={margin_left}
                            y={height}
                            width={margin_right-margin_left}
                            height={old_height-height - STROKE_WIDTH_LIQUID/2}
                            fill={ingredient.backgroundColor}
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
                    {array_rect_liquid}
                    {array_line_liquid}
                    <Polyline
                        points={points}
                        stroke="black"
                        fill="none"
                        strokeWidth={`${STROKE_WIDTH_GLASS}`}
                    />
                </Svg>
            </View>
        );
    }
};