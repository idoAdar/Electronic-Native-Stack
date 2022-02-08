import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// Navigators
import TabNavigation from './TabNavigation';
import {UserStackNavigation} from './StackNavigation';

// Screens
import DrawerContent from '../containers/DrawerContent/DrawerContent';

const DrawerNavigation = () => {
  const DrawerNavigator = createDrawerNavigator();

  return (
    <DrawerNavigator.Navigator
      drawerContent={props => <DrawerContent {...props} />}
      screenOptions={{headerShown: false, drawerStyle: {width: '75%'}}}>
      <DrawerNavigator.Screen name={'drawer-main'} component={TabNavigation} />
      <DrawerNavigator.Screen name={'main'} component={UserStackNavigation} />
    </DrawerNavigator.Navigator>
  );
};

export default DrawerNavigation;
