import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { gameStateActions } from './redux';

import App from './App.js';

const mapStateToProps = (state) => {
  return { gameState: { ...state.gameStateReducer } };
};

const mapDispatchToProps = (dispatch) => ({ actions: { ...bindActionCreators(gameStateActions, dispatch) } });

export default connect(mapStateToProps, mapDispatchToProps)(App);  