import React from 'react';
import {View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Navigators
import {UserStackNavigation} from './StackNavigation';

// Screens
import DrawerContent from '../containers/DrawerContent/DrawerContent';

const DrawerNavigation = () => {
  const DrawerNavigator = createDrawerNavigator();

  return (
    <DrawerNavigator.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{headerShown: false, drawerStyle: {width: '75%'}}}>
      <DrawerNavigator.Screen
        name={'drawer-main'}
        component={UserStackNavigation}
      />
    </DrawerNavigator.Navigator>
  );
};

export default DrawerNavigation;
