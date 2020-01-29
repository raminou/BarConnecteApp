import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MenuScreen from './src/screens/MenuScreen';
import CocktailScreen from './src/screens/CocktailScreen';

const MainNavigator = createStackNavigator({
	Menu: MenuScreen,
	Cocktail: CocktailScreen
}, {
	initialRouteName: 'Menu'
});

const App = createAppContainer(MainNavigator);

export default App;
