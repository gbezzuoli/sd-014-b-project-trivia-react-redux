export const SEND_USER_INFO = 'SEND_USER_INFO';
export const REQUEST_QUESTION = 'REQUEST_QUESTION ';
export const RECEIVE_QUESTION = 'RECEIVE_QUESTION ';

export const sendUserInfo = (payload) => ({
  type: SEND_USER_INFO,
  payload,
});

export const requestQuestion = () => ({
  type: REQUEST_QUESTION,
});

export const receiveQuestion = (questions) => ({
  type: RECEIVE_QUESTION,
  questions,
});

export function fetchQuestion(token) {
  return (dispacth) => {
    dispacth(requestQuestion());
    fetch(`https://opentdb.com/api.php?amount=5&token=${token}`)
      .then((promise) => promise.json())
      .then((json) => dispacth(receiveQuestion(json)));
  };
}
