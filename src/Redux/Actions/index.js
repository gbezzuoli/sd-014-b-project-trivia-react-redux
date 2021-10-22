export const SET_USER_DATA = 'SETUSERDATA';
export const SET_FEEDBACK = 'SET_FEEDBACK';

export const setuserdata = (payload) => ({
  type: SET_USER_DATA, payload,
});

export const setfeedback = (payload) => ({
  type: SET_FEEDBACK, payload,
});
