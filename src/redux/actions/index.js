export const ACTIONS = {
  GET_TOKEN: 'GET_TOKEN',
  GET_NAME_AND_EMAIL: 'GET_NAME_AND_EMAIL',
  GET_AVATAR: 'GET_AVATAR',
  SET_SCORE: 'SET_SCORE',
  GET_QUESTIONS: 'GET_QUESTIONS',
};

export const getGameTokenAction = (payload) => ({
  type: ACTIONS.GET_TOKEN,
  payload,
});

export const getNameAndEmailAction = (name, email) => ({
  type: ACTIONS.GET_NAME_AND_EMAIL,
  name,
  email,
});

export const getAvatarAction = (profileImage) => ({
  type: ACTIONS.GET_AVATAR,
  payload: profileImage,
});

export const setScoreAction = (score) => ({
  type: ACTIONS.SET_SCORE,
  payload: score,
});

export const getQuestions = (payload) => ({
  type: ACTIONS.GET_QUESTIONS,
  payload,
});
