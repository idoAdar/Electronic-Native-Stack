import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Components
import AppTabBar from '../components/AppTabBar/AppTabBar';
import HomeScreen from '../containers/HomeScreen/HomeScreen';
import OrdersScreen from '../containers/OrdersScreen/OrdersScreen';

const TabNavigation = () => {
  const TabNavigator = createBottomTabNavigator();

  return (
    <TabNavigator.Navigator
      screenOptions={{headerShown: false}}
      tabBar={props => <AppTabBar {...props} />}>
      <TabNavigator.Screen name={'home-tab'} component={HomeScreen} />
      <TabNavigator.Screen name={'orders-tab'} component={OrdersScreen} />
    </TabNavigator.Navigator>
  );
};

export default TabNavigation;
