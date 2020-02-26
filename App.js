import React from 'react';
//nav
import {createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';

//components
import HomeScreen from './screens/HomeScreen';
import SnapScreen from './screens/SnapScreen';
import GalleryScreen from './screens/GalleryScreen';
console.disableYellowBox = true;

//redux
import {connect} from 'react-redux';
import addReducer from './reducers/addPic';
import {Provider} from 'react-redux';
import {createStore, combineReducers}  from 'redux';

const store = createStore(combineReducers({addReducer}));



var BottomNavigator = createBottomTabNavigator(
  {
    Gallery: GalleryScreen,
    Snap: SnapScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName === 'Snap') {
          iconName = 'ios-camera';
        } else if (navigation.state.routeName === 'Gallery') {
          iconName = 'ios-folder-open';
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#0984e3',
      inactiveTintColor: '#dfe6e9',
      style: {
        backgroundColor: 'black'
      }
    },
  }
);


var StackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      headerShown: false
    })
  },
  App: {
    screen: BottomNavigator,
    navigationOptions: () => ({
      headerShown: false
    })
  }
});

var Navigation = createAppContainer(StackNavigator);

export default function App () {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
