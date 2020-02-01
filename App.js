import './src/global';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MenuScreen from './src/screens/MenuScreen';
import CocktailScreen from './src/screens/CocktailScreen';
import CocktailQueueScreen from './src/screens/CocktailQueueScreen';

const MainNavigator = createStackNavigator({
	Menu: MenuScreen,
	Cocktail: CocktailScreen,
	CocktailQueue: CocktailQueueScreen
}, {
	initialRouteName: 'Menu'
});

const App = createAppContainer(MainNavigator);

export default App;
