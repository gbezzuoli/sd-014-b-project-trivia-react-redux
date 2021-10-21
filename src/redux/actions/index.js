export const GET_TOKEN = 'GET_TOKEN';
export const GET_NAME_AND_EMAIL = 'GET_NAME_AND_EMAIL';

export const getGameTokenAction = (payload) => ({
  type: GET_TOKEN,
  payload,
});

export const getNameAndEmailAction = (name, email) => ({
  type: 'GET_NAME_AND_EMAIL',
  name,
  email,
});
