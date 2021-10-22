export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_NAME = 'ADD_NAME';

export function addEmail(payload) {
  return {
    type: ADD_EMAIL,
    payload,
  };
}

export function addName(payload) {
  return {
    type: ADD_NAME,
    payload,
  };
}
