import React, { Component } from 'react'
import { Platform, Vibration, AppState, Alert } from 'react-native'
import 'react-native-gesture-handler';

import { store, persistor } from './src/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import AppContainer from './src/navigation/index'

// Notifications
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

import './google-services.json'


class App extends Component {

  state = {
    expoPushToken: '',
    notification: {},
    // appState: AppState.currentState
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      // console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  componentDidMount = () => {
    this.registerForPushNotificationsAsync();
    // this._notificationSubscription = Notifications.addListener(this._handleNotification);
    // AppState.addEventListener("change", this._handleAppStateChange);
  }

  // componentWillUnmount = () => {
  //   AppState.removeEventListener("change", this._handleAppStateChange);
  // }

  // _handleAppStateChange = nextAppState => {
  //   if (
  //     this.state.appState.match(/inactive|background/) &&
  //     nextAppState === "active"
  //   ) {
  //     console.log("App has come to the foreground!");
  //   }
  //   this.setState({ appState: nextAppState });
  // };

  // _handleNotification = notification => {
  //   Vibration.vibrate();
  //   this.setState({ notification: notification });
  //   Alert.alert('error', notification)
  // };

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    )
  }
}



export default App;