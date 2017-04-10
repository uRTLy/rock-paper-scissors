import React, { Component } from 'react';
import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';
import assets from '../../config/assets.js';

const hands = assets.images;

export default class Hand extends Component {
  render() {
    const { type } = this.props;
    return (
      <TouchableOpacity 
        style={styles.container}
        disabled={this.props.disabled}
        onPress={this.props.onPress}
      >
        <Image style={styles.image} source={hands[type]}/>
      </TouchableOpacity>
    );
  }
}

const roundBtn = {
    borderRadius: 30,
    width: 60,
    height: 60
  };

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    ...roundBtn
  },
  image: {
    ...roundBtn
  }
});
