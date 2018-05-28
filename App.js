/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import { createStore } from "redux";
import { Provider } from "react-redux";

import reducer from "./src/reducers";
import { DARK_PRIMARY } from "./src/colors";
import { MainScreen } from "./src/components";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
const store = createStore(reducer);

const App = () => (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar backgroundColor={DARK_PRIMARY} />
        <MainScreen />
      </View>
    </Provider>
  );

export default App;
