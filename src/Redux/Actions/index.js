export const SET_USER_DATA = 'SETUSERDATA';
export const SET_FEEDBACK = 'SET_FEEDBACK';

export const setuserdata = (payload) => ({
  type: SET_USER_DATA, payload,
});

export const setfeedback = (payload) => ({
  type: SET_FEEDBACK, payload,
});

// change color redux;
export const SET_BUTTON_COLLOR = 'SET_BUTTON_COLLOR';
export const setButtonColoor = (payload) => ({
  type: SET_BUTTON_COLLOR, payload,
});
