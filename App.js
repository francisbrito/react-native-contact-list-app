/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { createStackNavigator } from "react-navigation";
import thunk from "redux-thunk";
import logger from "redux-logger";

import reducer from "./src/reducers";
import { DARK_PRIMARY } from "./src/colors";
import { MainScreen, AddContactScreen } from "./src/components";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
const store = createStore(
  reducer,
  applyMiddleware(thunk),
  applyMiddleware(logger)
);
const Navigator = createStackNavigator({
  Main: MainScreen,
  AddContact: AddContactScreen
});

const App = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <StatusBar backgroundColor={DARK_PRIMARY} />
      <Navigator />
    </View>
  </Provider>
);

export default App;
