import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import Home from '../screens/home';
import Details from '../screens/details';

const screens = {
    // First Page   
    "Find Pokemon": {
        screen: Home
    },
    // Detail Page
    "Pokemon Details": {
        screen: Details
    },
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);