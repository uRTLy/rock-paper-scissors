import { actions, initialState, reducer } from '../../src/redux/models/gameState.js';
import { HANDS } from '../../src/config/constants.js';

const { changeGameStage, checkWinner, scorePoint, computerSelect, playerSelect } = actions;

const [ rock, paper, scissors ] = HANDS; 

const testState = { 
	playerChoice: null,
	computerChoice: null,
	winner: null,
	message: '',
	playerScore: 0,
	computerScore: 0,
	gameStage: 'NEW_GAME'
};

describe('GameState reducer', () => {

	it('returns default state if action with unexpected type comes in', () => {
		expect(
			reducer(undefined, { type: 'unexpected_type' })
		).toEqual(initialState);

	});

	it('new game should return initial state', () => {
		expect(
			reducer(
				{ testState, playerScore: 2, computerScore: 5, playerChoice: paper, computerChoice: rock },
				changeGameStage('NEW_GAME')
			)
		).toEqual(initialState);
	});


	describe('selecting a rock, scissors or paper should work properly for both players', () => {	
		const mockedState = { 
			playerChoice: null,
			computerChoice: null,
			winner: null,
			message: '',
			playerScore: 0,
			computerScore: 0,
			gameStage: 'NEW_GAME'
		};
		
		it('selecting for computer should work properly', () => {
			expect(
				reducer(mockedState, computerSelect(rock))
			).toEqual({ ...mockedState, computerChoice: rock });

			expect(
				reducer(mockedState, computerSelect(paper))
			).toEqual({ ...mockedState, computerChoice: paper });

			expect(
				reducer(mockedState, computerSelect(scissors))
			).toEqual({ ...mockedState, computerChoice: scissors });

		});

		it('selecting for player should work properly', () => {

			expect(
				reducer(mockedState, playerSelect(rock))
			).toEqual({ ...mockedState, playerChoice: rock });

			expect(
				reducer(mockedState, playerSelect(paper))
			).toEqual({ ...mockedState, playerChoice: paper });

			expect(
				reducer(mockedState, playerSelect(scissors))
			).toEqual({ ...mockedState, playerChoice: scissors });
		});

	});

	describe('should score points correctly based on player and computer choice', () => {

		it('should correctly determine that this round player was a winner and add him a point', () => {

			const mockedState = {
				playerChoice: rock,			
				computerChoice: scissors,
				winner: null,
				message: '',
				playerScore: 0,
				computerScore: 0,
				gameStage: 'NEW_GAME'
			};

			expect(
				reducer(mockedState, scorePoint())
			).toEqual({ 
				...mockedState,
				playerScore: 1, 
				computerScore: 0, 
				message: 'PLAYER SCORED A POINT!'
			});

			expect(
				reducer({ ...mockedState, playerChoice: scissors, computerChoice: paper }, scorePoint())
			).toEqual({ 
				...mockedState,
				playerChoice: scissors,
				computerChoice: paper,
				playerScore: 1, 
				computerScore: 0, 
				message: 'PLAYER SCORED A POINT!'
			});


			expect(
				reducer({ ...mockedState, playerChoice: paper, computerChoice: rock }, scorePoint())
			).toEqual({ 
				...mockedState,
				playerChoice: paper,
				computerChoice: rock,
				playerScore: 1, 
				computerScore: 0, 
				message: 'PLAYER SCORED A POINT!'
			});

	});

	it('should correctly determine that this round there was a tie and no one has a point', () => {

			const mockedState = {
			playerChoice: rock,			
			computerChoice: rock,
			winner: null,
			message: '',
			playerScore: 0,
			computerScore: 0,
			gameStage: 'NEW_GAME'
		};

		expect(
			reducer(mockedState, scorePoint())
		).toEqual({ 
			...mockedState,
			playerScore: 0, 
			computerScore: 0, 
			message: 'TIE'
		});

		expect(
			reducer({ ...mockedState, playerChoice: paper, computerChoice: paper }, scorePoint())
		).toEqual({ 
			...mockedState,
			playerChoice: paper,
			computerChoice: paper,
			playerScore: 0, 
			computerScore: 0, 
			message: 'TIE'
		});

		expect(
			reducer({ ...mockedState, playerChoice: scissors, computerChoice: scissors }, scorePoint())
		).toEqual({ 
			...mockedState,
			playerChoice: scissors,
			computerChoice: scissors,
			playerScore: 0, 
			computerScore: 0, 
			message: 'TIE'
		});

	});


	it('should correctly determine that this round computer was a winner and add him a point', () => {

			const mockedState = {
			computerChoice: rock,
			playerChoice: scissors,			
			winner: null,
			message: '',
			playerScore: 0,
			computerScore: 0,
			gameStage: 'NEW_GAME'
		};

		expect(
			reducer(mockedState, scorePoint())
		).toEqual({ 
			...mockedState,
			playerScore: 0, 
			computerScore: 1, 
			message: 'COMPUTER SCORED A POINT!'
		});

		expect(
			reducer({ ...mockedState, computerChoice: paper, playerChoice: rock }, scorePoint())
		).toEqual({ 
			...mockedState,
			computerChoice: paper, 
			playerChoice: rock,
			playerScore: 0, 
			computerScore: 1, 
			message: 'COMPUTER SCORED A POINT!'
		});

		expect(
			reducer({ ...mockedState, computerChoice: scissors, playerChoice: paper }, scorePoint())
		).toEqual({ 
			...mockedState,
			computerChoice: scissors, 
			playerChoice: paper,
			playerScore: 0, 
			computerScore: 1, 
			message: 'COMPUTER SCORED A POINT!'
		});
	});
		
});

	it('should change gameStage properly', () => {

		expect(
			reducer(initialState, changeGameStage('NEW_GAME'))
		).toEqual({ ...testState, gameStage: 'NEW_GAME' });

		expect(
			reducer({ ...testState, gameStage: 'NEW_GAME' }, changeGameStage('GAME_ON'))
		).toEqual({ ...testState, gameStage: 'GAME_ON' });

		expect(
			reducer({ ...testState, gameStage: 'NEW_GAME' }, changeGameStage('GAME_OVER'))
		).toEqual({ ...testState, gameStage: 'GAME_OVER' });

		expect(
			reducer({ ...testState, winner: null, computerScore: 1, playerScore: 1, gameStage: 'GAME_ON' }, checkWinner())
		).toEqual({ ...testState, winner: null, computerScore: 1, playerScore: 1, gameStage: 'GAME_ON' });

		expect(
			reducer({ ...testState, winner: null, computerScore: 4, playerScore: 1, gameStage: 'GAME_ON' }, checkWinner())
		).toEqual({ ...testState, winner: 'computer', computerScore: 4, playerScore: 1, gameStage: 'GAME_OVER' });

		expect(
			reducer({ ...testState, winner: null, computerScore: 2, playerScore: 5, gameStage: 'GAME_ON' }, checkWinner())
		).toEqual({ ...testState, winner: 'player', computerScore: 2, playerScore: 5, gameStage: 'GAME_OVER' });

	});


	describe('reducer determines the winner properly', () => {

		it('should see that with 3 points advantage for player - the winner is player', () => {

			const mockedState = {
				playerChoice: null,
				computerChoice: null,
				winner: null,
				message: '',
				playerScore: 3,
				computerScore: 0,
				gameStage: 'GAME_ON'
			};

			expect(
				reducer(mockedState, checkWinner())
			).toEqual({ ...mockedState, winner: 'player', gameStage: 'GAME_OVER' });

			expect(
				reducer({ ...mockedState, playerScore: 5, computerScore: 2 }, checkWinner())
			).toEqual(
				{ ...mockedState, playerScore: 5, computerScore: 2, winner: 'player', gameStage: 'GAME_OVER' }
			);

			expect(
				reducer({ ...mockedState, playerScore: 10, computerScore: 7 }, checkWinner())
			).toEqual(
				{ ...mockedState, playerScore: 10, computerScore: 7, winner: 'player', gameStage: 'GAME_OVER' }
			);

		});

		it('should see that with 3 points advantage for computer - the winner is computer', () => {

			const mockedState = {
				playerChoice: null,
				computerChoice: null,
				winner: null,
				message: '',
				playerScore: 0,
				computerScore: 3,
				gameStage: 'GAME_ON'
			};

			expect(
				reducer(mockedState, checkWinner())
			).toEqual({ ...mockedState, winner: 'computer', gameStage: 'GAME_OVER' });

			expect(
				reducer({ ...mockedState, computerScore: 9, playerScore: 6 }, checkWinner())
			).toEqual({ ...mockedState, computerScore: 9, playerScore: 6, winner: 'computer', gameStage: 'GAME_OVER' });

			expect(
				reducer({ ...mockedState, computerScore: 12, playerScore: 9 }, checkWinner())
			).toEqual({ ...mockedState, computerScore: 12, playerScore: 9, winner: 'computer', gameStage: 'GAME_OVER' });

		});

		it('should see if there is no winner at all', () => {

			const mockedState = {
				playerChoice: null,
				computerChoice: null,
				winner: null,
				message: '',
				playerScore: 1,
				computerScore: 2,
				gameStage: 'GAME_ON'
			};
			expect(
				reducer(mockedState, checkWinner())
			).toEqual({ ...mockedState, winner: null, gameStage: 'GAME_ON' });

			expect(
				reducer({ ...mockedState, playerScore: 2, computerScore: 2 }, checkWinner())
			).toEqual({ ...mockedState, playerScore: 2, computerScore: 2, winner: null, gameStage: 'GAME_ON' });

			expect(
				reducer({ ...mockedState, playerScore: 3, computerScore: 2 }, checkWinner())
			).toEqual({ ...mockedState, playerScore: 3, computerScore: 2, winner: null, gameStage: 'GAME_ON' });

		});

	});

});