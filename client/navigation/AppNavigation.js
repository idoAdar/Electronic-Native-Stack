import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

// Navigations:
import DrawerNavigation from './DrawerNavigation';
import {AuthStackNavigation} from './StackNavigation';

const AppNavigation = () => {
  const {isAuth} = useSelector(state => state.accountSlice);
  const MainNavigator = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <MainNavigator.Navigator screenOptions={{headerShown: false}}>
        {isAuth ? (
          <MainNavigator.Group>
            <MainNavigator.Screen
              name={'drawer'}
              component={DrawerNavigation}
            />
          </MainNavigator.Group>
        ) : (
          <MainNavigator.Group>
            <MainNavigator.Screen
              name={'on-boarding'}
              component={AuthStackNavigation}
            />
          </MainNavigator.Group>
        )}
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
