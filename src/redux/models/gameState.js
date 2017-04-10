const actionTypes = {
  SCORE_POINT: 'GAME_STATE/SCORE_POINT',
  CHECK_WINNER: 'GAME_STATE/CHECK_WINNER',
  CHANGE_GAME_STAGE: 'GAME_STATE/CHANGE_GAME_STAGE',
  PLAYER_SELECT: 'GAME_STATE/PLAYER_SELECT',
  COMPUTER_SELECT: 'GAME_STATE/COMPUTER_SELECT'
};

export const initialState = {
  playerChoice: null,
  computerChoice: null,
  winner: null,
  message: '',
  gameStage: 'NEW_GAME',
  playerScore: 0,
  computerScore: 0
};

// extracted part of business logic to outer function
function calculatePoints (state) {
  const { computerChoice, playerChoice } = state;

  if (playerChoice.name === computerChoice.name) {
    return { ...state, message: 'TIE' };
  }

  if (playerChoice.losesTo === computerChoice.name) { 
    return { ...state, computerScore: state.computerScore + 1, message: 'COMPUTER SCORED A POINT!' };
  }

  if (playerChoice.winsWith === computerChoice.name) {
    return { ...state, playerScore: state.playerScore + 1, message: 'PLAYER SCORED A POINT!' };  
  }
  
  return { ...state };
}


function getWinner({ playerScore, computerScore }, pointAdvantage) {
  return (playerScore >= computerScore + pointAdvantage) ? 'player' : 
         (computerScore >= playerScore + pointAdvantage) ? 'computer' :
         null;
}


export function reducer(state = initialState, action) {

  switch (action.type) {

    case actionTypes.SCORE_POINT: 
      return calculatePoints(state);

    case actionTypes.CHECK_WINNER:
      const pointAdvantage = 3; // point advantage over another player that is required to win
      const winner = getWinner(state, pointAdvantage);

      return { ...state, winner, gameStage: (!!winner) ? 'GAME_OVER' : 'GAME_ON' };

    case actionTypes.CHANGE_GAME_STAGE: 
      if (action.gameStage === 'NEW_GAME') {
        return { ...initialState };
      }
      return { ...state, gameStage: action.gameStage };

    case actionTypes.PLAYER_SELECT:
      return { ...state, playerChoice: action.playerChoice };

    case actionTypes.COMPUTER_SELECT:
      return { ...state, computerChoice: action.computerChoice };
      
    default: 
      return state;
  }
}

function scorePoint() {
  return {
    type: actionTypes.SCORE_POINT
  };
}

function checkWinner() {
  return {
    type: actionTypes.CHECK_WINNER
  };
}

function changeGameStage(gameStage) {
  return {
    type: actionTypes.CHANGE_GAME_STAGE,
    gameStage
  };
}


function playerSelect(playerChoice) {
  return {
    type: actionTypes.PLAYER_SELECT,
    playerChoice
  };
}

function computerSelect(computerChoice) {
  return {
    type: actionTypes.COMPUTER_SELECT,
    computerChoice
  };
}

export const actions = {
  computerSelect,
  playerSelect,
  checkWinner,
  scorePoint,
  changeGameStage
};
