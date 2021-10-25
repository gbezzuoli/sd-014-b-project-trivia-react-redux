export const GAME_QUESTIONS = 'GAME_QUESTIONS';
export const ADD_SCORE = 'ADD_SCORE';
export const SEND_FEEDBACK = 'SEND_FEEDBACK';
export const SEND_RANKING = 'SEND_RANKING';
export const RESET_BOARD = 'RESET_BOARD';

export const gameQuestionsAction = (payload) => ({
  type: GAME_QUESTIONS,
  payload,
});

export const addScoreAction = (payload) => ({
  type: ADD_SCORE,
  payload,
});

export const resetAssertionsAction = (payload) => ({
  type: RESET_BOARD,
  payload,
});

export const sendPlayerFeedback = (payload) => ({
  type: SEND_FEEDBACK,
  payload,
});

export const sendPlayerRanking = (payload) => ({
  type: SEND_RANKING,
  payload,
});

export const fecthTriviaQuestions = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const result = await response.json();
  return dispatch(gameQuestionsAction(result));
};
