/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import ChatNavigator from "./navigation/ChatNavigator";
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import convosReducer from './store/reducers/convos';
declare var global: {HermesInternal: null | {}};
enableScreens();


const rootReducer = combineReducers({
  convos: convosReducer
});

const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

const App = () => {

  const [fontLoaded, setFontLoaded] = useState(false);
  
  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)}
      onError={(err) => console.log(err)}
    />
  }

  return (
    <Provider store={store} ><ChatNavigator /></Provider>
  );
};

export default App;
