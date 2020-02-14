import React from 'react';
import { TouchableHighlight, View, Text, Image, Dimensions } from 'react-native';
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
        borderColor: '#ebc700',
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

/*
 * Menu Screen displaying buttons & logo
 */
export default class MenuScreen extends React.Component {
    // Declare the headerBar option
    static navigationOptions = {
        title: 'Menu'
    };

    constructor(props) {
        super(props);
    }

    // Called each time this.state is changed to render the component
    render() {
        const {navigate} = this.props.navigation;
        
        return (
            <View style={style.root}>
                <View
                    style={{
                        alignItems: 'center',
                        paddingTop: 15,
                        flexDirection: 'row',
                        flex: 1
                    }}
                >
                    <Image
                        style={{flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height}}
                        source={require('../../resources/logo.png')}
                        resizeMode="contain"
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