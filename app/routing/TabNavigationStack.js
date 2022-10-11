/**
 * @author Amusoftech <er.amudeep@gmail.com>
 * @description Minimal example of Tab Navigations
 */
import * as React from 'react';
import {Linking, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RoutesList} from './routes';
import {publicRoutes} from './publicRoutes';
import {appColors} from '../utils/appColors';
import {utils} from '@react-native-firebase/app';
import dynamicLinks from '@react-native-firebase/dynamic-links';

const Tab = createBottomTabNavigator();

export default function TabNavigationStack({isAuth}) {
  const linking = {
    prefixes: ['customerglu://'],
    async getInitialURL() {
      // First, you would need to get the initial URL from your third-party integration
      // The exact usage depend on the third-party SDK you use
      // For example, to get to get the initial URL for Firebase Dynamic Links:
      const {isAvailable} = utils().playServicesAvailability;

      if (isAvailable) {
        const initialLink = await dynamicLinks().getInitialLink();

        if (initialLink) {
          return initialLink.url;
        }
      }

      // As a fallback, you may want to do the default deep link handling
      const url = await Linking.getInitialURL();

      return url;
    },

    // Custom function to subscribe to incoming links
    subscribe(listener) {
      // Listen to incoming links from Firebase Dynamic Links
      const unsubscribeFirebase = dynamicLinks().onLink(({url}) => {
        listener(url);
      });

      // Listen to incoming links from deep linking
      const linkingSubscription = Linking.addEventListener('url', ({url}) => {
        listener(url);
      });

      return () => {
        // Clean up the event listeners
        unsubscribeFirebase();
        linkingSubscription && linkingSubscription.remove();
      };
    },

    config: {
      initialRouteName: 'Home',
      screens: {
        Home: {
          path: 'home',
        },
        Account: {
          path: 'profile',
        },
        Cart: {
          path: 'cart',
        },
      },
    },
  };
  const [routes, setRoutes] = React.useState([...publicRoutes, ...RoutesList]);

  return (
    <NavigationContainer linking={linking}>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: appColors.primary,
          inactiveTintColor: appColors.darkGray,
        }}>
        {routes?.map((route, key) => {
          const {name, component, options} = route;
          return (
            <Tab.Screen
              key={key}
              name={name}
              component={component}
              options={options}
            />
          );
        })}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
