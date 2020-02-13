import React from 'react';
import { TouchableHighlight, View, Text, Image } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Icon } from 'react-native-elements';

const style = {
    root: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: 5
    },
    TouchableHighlight: {
        backgroundColor: "#dddddd",
        margin: 10
    },
    ViewTouchableHighlight: {
        paddingHorizontal: 10,
        borderColor: '#faa222',
        borderRadius: 5,
        borderWidth: 2,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
    },
    LeftColViewTouchableHighlight: {
        flex: 1
    },
    RightColViewTouchableHighlight: {
        flex: 6
    },
    TextRightColViewTouchableHighlight: {
        fontSize: 30
    }
};

export default class MenuScreen extends React.Component {
    static navigationOptions = {
        title: 'Menu'
    };

    render() {
        const {navigate} = this.props.navigation;
        
        return (
            <View style={style.root}>
                <View
                    style={{
                        alignItems: 'center',
                        paddingTop: 15,
                    }}
                >
                    <Image
                        source={require('../../resources/logo.png')}
                    />
                </View>
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        marginTop: -50
                    }}
                    
                >
                    <TouchableHighlight
                        activeOpacity={1}
                        underlayColor="#cccccc"
                        onPress={() => navigate('Cocktail', {})}
                        style={style.TouchableHighlight}
                    >
                        <View style={style.ViewTouchableHighlight}>
                            <View 
                                style={style.LeftColViewTouchableHighlight}
                            >
                                <Icon type="material-community" name="glass-cocktail" />
                            </View>
                            <View
                                style={style.RightColViewTouchableHighlight}
                            >
                                <Text style={style.TextRightColViewTouchableHighlight}>Prepare your own</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight
                        activeOpacity={1}
                        underlayColor="#cccccc"
                        onPress={() => navigate('CocktailQueue', {})}
                        style={style.TouchableHighlight}
                    >
                        <View style={style.ViewTouchableHighlight}>
                            <View
                                style={style.LeftColViewTouchableHighlight}
                            >
                                <Icon type="material-community" name="comment-question-outline" />
                            </View>
                            <View
                                style={style.RightColViewTouchableHighlight}
                            >
                                <Text style={style.TextRightColViewTouchableHighlight}>Cocktail status</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}