import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';

export default class Ingredient extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            value: props.value
        };
    }

    getValue() {
        return this.state.value;
    }

    render() {
        return (
            <View style={{
                flexDirection: 'column',
                flex: 1
            }}>
                <View style= {{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'space-between'
                }}>
                    <View><Text>{this.state.name}</Text></View>
                    <View><Text>{this.state.value}</Text></View>
                </View>
                <View style={{
                    flex: 1
                }}>
                    <Slider
                        minimumValue={0}
                        maximumValue={100}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        step={1}
                        value={this.state.value}
                        onValueChange={(value) => this.props.onValueChange(value)}
                    />
                </View>
            </View>
        );
    }
}