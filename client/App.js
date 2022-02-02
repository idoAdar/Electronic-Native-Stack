import React from 'react';
import {LogBox} from 'react-native';
import {Provider} from 'react-redux';
import store from './redux/store/store';
import AppNavigation from './navigation/AppNavigation';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Provider as PaperProvider} from 'react-native-paper';

LogBox.ignoreLogs(['Require cycles', 'react-native-gesture-handler']);

EStyleSheet.build({});

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <AppNavigation />
      </PaperProvider>
    </Provider>
  );
};

export default App;
