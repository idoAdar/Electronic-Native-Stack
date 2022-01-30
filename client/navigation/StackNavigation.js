import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Containers
import HomeScreen from '../containers/HomeScreen/HomeScreen';
import ProductScreen from '../containers/ProductScreen/ProductScreen';
import LoadingScreen from '../containers/LoadingScreen/LoadingScreen';
import CartScreen from '../containers/CartScreen/CartScreen';
import CheckoutScreen from '../containers/CheckoutScreen/CheckoutScreen';
import SignInScreen from '../containers/SignInScreen/SignInScreen';
import SignUpScreen from '../containers/SignUpScreen/SignUpScreen';

export const UserStackNavigation = () => {
  const UserStackNavigator = createNativeStackNavigator();

  return (
    <UserStackNavigator.Navigator screenOptions={{headerShown: false}}>
      <UserStackNavigator.Screen name={'home'} component={HomeScreen} />
      <UserStackNavigator.Screen name={'product'} component={ProductScreen} />
      <UserStackNavigator.Screen name={'cart'} component={CartScreen} />
      <UserStackNavigator.Screen name={'checkout'} component={CheckoutScreen} />
    </UserStackNavigator.Navigator>
  );
};

export const AuthStackNavigation = () => {
  const AuthStackNavigator = createNativeStackNavigator();

  return (
    <AuthStackNavigator.Navigator screenOptions={{headerShown: false}}>
      <AuthStackNavigator.Screen name={'loading'} component={LoadingScreen} />
      <AuthStackNavigator.Screen name={'sign-in'} component={SignInScreen} />
      <AuthStackNavigator.Screen name={'sign-up'} component={SignUpScreen} />
    </AuthStackNavigator.Navigator>
  );
};
