export const SUBMIT_PLAYER = 'SUBMIT_PLAYER';
export const SAVE_QUESTIONS = 'SAVE_QUESTIONS';
export const RENDER_QUESTIONS = 'RENDER_QUESTIONS';

export const submitPlayerAction = (player, token, email) => ({
  type: SUBMIT_PLAYER, player, token, email,
});

export const saveQuestions = (questions) => ({
  type: SAVE_QUESTIONS,
  questions,
});

export const renderQuestions = (num) => ({
  type: RENDER_QUESTIONS,
  num,
});
