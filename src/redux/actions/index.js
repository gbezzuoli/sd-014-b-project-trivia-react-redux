export const SEND_USER_INFO = 'SEND_USER_INFO';

export const sendUserInfo = (payload) => ({
  type: SEND_USER_INFO,
  payload,
});
