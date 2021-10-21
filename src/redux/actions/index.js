export const SUBMIT_PLAYER = 'SUBMIT_PLAYER';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';

export const submitPlayerAction = (player, token, email) => ({
  type: SUBMIT_PLAYER, player, token, email,
});

export const saveQuestionsAction = (questions) => ({
  type: SAVE_QUESTIONS,
  questions,
});
