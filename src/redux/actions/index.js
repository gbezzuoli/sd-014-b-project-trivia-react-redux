export const SEND_USER_EMAIL = 'SEND_USER_EMAIL';
export const SEND_USERNAME = 'SEND_USERNAME';

export const sendUserEmail = (payload) => ({
  type: SEND_USER_EMAIL,
  payload,
});

export const sendUsername = (payload) => ({
  type: SEND_USERNAME,
  payload,
});
