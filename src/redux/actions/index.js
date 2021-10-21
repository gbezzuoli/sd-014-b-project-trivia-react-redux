export const GET_TOKEN = 'GET_TOKEN';
export const GET_NAME_AND_EMAIL = 'GET_NAME_AND_EMAIL';
export const GET_AVATAR = 'GET_AVATAR';
export const GET_SCORE = 'GET_SCORE';

export const getGameTokenAction = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getNameAndEmailAction = (name, email) => ({
  type: 'GET_NAME_AND_EMAIL',
  name,
  email,
});

export const getAvatarAction = (profileImage) => ({
  type: GET_AVATAR,
  payload: profileImage,
});

export const getScore = (score) => ({
  type: GET_SCORE,
  payload: score,
});
