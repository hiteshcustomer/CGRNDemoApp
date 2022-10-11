/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import MainStack from './app/routing/MainStack';
import {Provider} from 'react-redux';
import {
  StatusBar,
  NativeModules,
  NativeEventEmitter,
  Linking,
} from 'react-native';
import storePre from './app/redux/store';
import DropdownAlert from 'react-native-dropdownalert';
import {AlertHelper} from './app/utils/AlertHelper';
import {PersistGate} from 'redux-persist/integration/react';
import TabNavigationStack from './app/routing/TabNavigationStack';
import {navigationTypeTabs} from './app.json';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {enableEntryPoints} from '@customerglu/react-native-customerglu';
// The notification must always imported.
import notification from './app/services/notification';
const {Rncustomerglu} = NativeModules;
const RncustomergluManagerEmitter = new NativeEventEmitter(Rncustomerglu);

MaterialIcons.loadFont();
Ionicons.loadFont();
FontAwesome.loadFont();
Feather.loadFont();
MaterialCommunityIcons.loadFont();

const App: () => React$Node = () => {
  const {persistor, store} = storePre;

  async function enableEntryPointsAsync() {
    console.log('Enabling entry points');
    await enableEntryPoints(true);
    console.log('Enabled');
  }

  async function handleRedirects(payload) {
    let url = payload.deepLink || payload.data?.deepLink;
    let canOpenURL = await Linking.canOpenURL(url);
    if (canOpenURL) {
      return Linking.openURL(url);
    }

    AlertHelper.show('error', 'Not possible to open the link');
  }

  useEffect(() => {
    enableEntryPointsAsync();
  }, []);

  useEffect(() => {
    const eventanalytics = RncustomergluManagerEmitter.addListener(
      'CUSTOMERGLU_ANALYTICS_EVENT',
      (reminder) => console.log('CUSTOMERGLU_ANALYTICS_EVENT...', reminder),
    );
    const eventdeeplink = RncustomergluManagerEmitter.addListener(
      'CUSTOMERGLU_DEEPLINK_EVENT',
      handleRedirects,
    );

    const eventfheight = RncustomergluManagerEmitter.addListener(
      'CGBANNER_FINAL_HEIGHT',
      (reminder) => {
        console.log('CGBANNER_FINAL_HEIGHT....', reminder);
      },
    );

    return () => {
      eventanalytics.remove();
      eventdeeplink.remove();
      eventfheight.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {navigationTypeTabs ? <TabNavigationStack /> : <MainStack />}
        <DropdownAlert
          defaultContainer={{
            padding: 8,
            paddingTop: StatusBar.currentHeight,
            flexDirection: 'row',
          }}
          ref={(ref) => AlertHelper.setDropDown(ref)}
          onClose={() => AlertHelper.invokeOnClose()}
        />
      </PersistGate>
    </Provider>
  );
};

export default App;
