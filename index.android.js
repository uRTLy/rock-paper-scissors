import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';

import { store } from './src/redux';
import App from './src';


export default class rock_paper_scissors extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
      );
  }
}


AppRegistry.registerComponent('rock_paper_scissors', () => rock_paper_scissors);
