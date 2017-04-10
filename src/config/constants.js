// I placed it here for better testing purposes. It's used to determine the winner and loser in each round
export const ROCK = 'rock';
export const PAPER = 'paper';
export const SCISSORS = 'scissors';

export const HANDS = [
  { name: ROCK, losesTo: PAPER, winsWith: SCISSORS }, 
	{ name: PAPER, losesTo: SCISSORS, winsWith: ROCK },
	{ name: SCISSORS, losesTo: ROCK, winsWith: PAPER }
];