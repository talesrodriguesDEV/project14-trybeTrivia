export const LOGIN = 'LOGIN';
export const ADD_SCORE = 'ADD_SCORE';
export const RESTART_GAME = 'RESTART_GAME';

export const loginAction = (payload) => ({ type: LOGIN, payload });

export const addScoreAction = (payload) => ({ type: ADD_SCORE, payload });

export const restartGame = () => ({ type: RESTART_GAME });
