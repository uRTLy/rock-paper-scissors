import React, { Component } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { ScoreBar, Hand } from './components';

// HANDS is an array with possible hands and  
import { HANDS } from './config/constants.js';

export default class App extends Component {
  constructor () {
    super();
    this.state = {
      disableButtons: false
    };
    this.onSelect = this.onSelect.bind(this);
    this.computerTurn = this.computerTurn.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.hands = HANDS;
  }
  componentWillReceiveProps({ gameState }) {
    const actualPlayerScore = this.props.gameState.playerScore;
    const actualComputerScore = this.props.gameState.computerScore;
    if (gameState.playerScore !== actualPlayerScore || gameState.computerScore !== actualComputerScore) {
      this.props.actions.checkWinner();
    }
  }
  onSelect(hand) {
    this.props.actions.playerSelect(hand);
    this.computerTurn();
  }
  computerTurn() {
    this.setState({ disableButtons: true });
    const random = Math.floor(Math.random() * this.hands.length);
    this.props.actions.computerSelect(this.hands[random]);
    this.setState({ disableButtons: false });
    this.props.actions.scorePoint();
  }
  startNewGame() {
    if (this.props.gameState.gameStage === 'GAME_OVER') {
      this.props.actions.changeGameStage('NEW_GAME');
    } else {
     this.props.actions.changeGameStage('GAME_ON');
    }
  }
  render() {
    const { disableButtons } = this.state;
    const [ rock, paper, scissors ] = this.hands;
    const { computerChoice, computerScore, playerScore, gameStage, message, winner } = this.props.gameState;

    // gameStages to properly hide and show certain views.
    const gameOver = (gameStage === 'GAME_OVER');
    const newGame = (gameStage === 'NEW_GAME');
    const gameOn = (gameStage === 'GAME_ON');

    return (
      <View style={styles.container}>

        {(newGame || gameOver)
          && <Button onPress={this.startNewGame} title={(gameOver) ? 'PLAY AGAIN!' : 'START GAME !'} />}
  
       {!newGame && <ScoreBar playerScore={playerScore} computerScore={computerScore} winner={winner} />}

        {gameOn &&
        <View style={styles.game}>

          <View style={styles.computerHand}>
            {!computerChoice && 
              <Text style={{ transform: [{ rotate: '180deg' }] }}> You first ! </Text>}

            {computerChoice && <Hand type={computerChoice.name} disabled={true} />}
          </View>
          
          <Text style={styles.versus}> {(message) ? message : 'vs'} </Text>

          <View style={styles.handContainer}>
            <Hand type='rock' disabled={disableButtons} onPress={() => this.onSelect(rock)} />
            <Hand type='paper' disabled={disableButtons} onPress={() => this.onSelect(paper)}/>
            <Hand type='scissors' disabled={disableButtons} onPress={() => this.onSelect(scissors)}/>
          </View>
        </View>}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  scorebar: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  game: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    flex: 1
  },
  handContainer: {
    height: 200,    
    flex: 1,
    zIndex: 11,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  versus: {
    textAlign: 'center',
    fontSize: 30,
    height: 100
  },
  computerHand: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',    
    height: 200,
    transform: [{ rotate: '180deg' }]
  }
});
