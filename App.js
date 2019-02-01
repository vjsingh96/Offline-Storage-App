/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import Routes from "./src/Router/Routes"
import { Provider } from 'react-redux';
import allReducers from './src/Reducer/index';
import FirstForm from "./src/ReduxForms/FirstForm"
import { createStore } from 'redux';

const store = createStore(allReducers);



export default class App extends Component {
  render() {

    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}
