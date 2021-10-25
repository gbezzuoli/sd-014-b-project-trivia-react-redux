export const SUBMIT_USER = 'SUBMIT_USER';
export const SUBMIT_SCORE = 'SUBMIT_SCORE';
export const RESET_USER_SCORE = 'RESET_USER_SCORE';

export const submitUser = (name, hashGravatar) => ({
  type: SUBMIT_USER,
  name,
  hashGravatar,
});

export const submitScore = (score, assertions) => ({
  type: SUBMIT_SCORE,
  score,
  assertions,
});

export const resetUserScore = () => ({
  type: RESET_USER_SCORE,
});
