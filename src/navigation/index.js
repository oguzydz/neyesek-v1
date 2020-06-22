import React from 'react'
import { Dimensions } from 'react-native'

// Screens
import Home from '../screens/HomeScreen/Home';
import Login from '../screens/LoginScreen/Login';
import Tarif from '../screens/TarifScreen/Tarif';

// Navigation
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import HerSey from '../screens/HerSeyScreen/HerSey';
import About from '../screens/AboutScreen/About';
import Check from '../screens/CheckScreen/Check';
import Favs from '../screens/FavsScreen/Favs';


const Stack = createStackNavigator({
    HomeScreen: {
        screen: Home,
        navigationOptions: () => {
            return {
                headerShown: false
            }
        }
    },
    LoginScreen: {
        screen: Login,
        navigationOptions: () => {
            return {
                headerShown: false
            }
        }
    },
    TarifScreen: {
        screen: Tarif,
        navigationOptions: () => {
            return {
                headerShown: false
            }
        }
    },
    HerSeyScreen: {
        screen: HerSey,
        navigationOptions: () => {
            return {
                headerShown: false
            }
        }
    },
    AboutScreen: {
        screen: About,
        navigationOptions: () => {
            return {
                headerShown: false
            }
        }
    },
    CheckScreen: {
        screen: Check,
        navigationOptions: () => {
            return {
                headerShown: false
            }
        }
    },
    FavsScreen: {
        screen: Favs,
        navigationOptions: () => {
            return {
                headerShown: false
            }
        }
    }
}, {
    // initialRouteName: 'AboutScreen'
    initialRouteName: 'CheckScreen'
})

const AppContainer = createAppContainer(Stack);
export default AppContainer
