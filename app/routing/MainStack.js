import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../screens/Home';
import {RoutesList} from './routes';
import {ActivityIndicator} from 'react-native';

const Stack = createStackNavigator();

const linking = {
  prefixes: ['customerglu://'],
  config: {
    initialRouteName: 'Home',
    screens: {
      Home: {
        path: 'home',
      },
      Cart: {
        path: 'cart',
      },
    },
  },
};

export default function MainStack() {
  return (
    <NavigationContainer
      linking={linking}
      fallback={<ActivityIndicator color="blue" size="large" />}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {RoutesList?.map((route, key) => {
          const {name, component} = route;
          return <Stack.Screen key={key} name={name} component={component} />;
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
