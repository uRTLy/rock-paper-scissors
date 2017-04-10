import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class ScoreBar extends Component { 
  render() {
    const { computerScore, playerScore, winner } = this.props
    return (
      <View style={[styles.scorebarContainer, (winner) ? { flexDirection: 'column' } : {}]}>
        {winner &&
          <Text style={styles.winner}> The winner is {winner.toUpperCase()}, with score...</Text>}
        <Text style={styles.score}> Player: {playerScore} </Text>
        <Text style={styles.score}> Computer: {computerScore} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scorebarContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  score: {
    width: 100,
  },
  winner: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});
