import { getApiTrivia } from '../../services/ApiRequest';

export const REQUEST_QUESTIONS = 'REQUEST_QUESTIONS';
export const GET_QUESTIONS = 'GET_QUESTIONS';

function requestQuestions() {
  return { type: REQUEST_QUESTIONS };
}

function getQuestions(questions) {
  return { type: GET_QUESTIONS, payload: questions };
}

function decodeQuestion(questionData) {
  const { question } = questionData;
  const decodedQuestion = atob(question);

  return { ...questionData, question: decodedQuestion };
}

export function fetchQuestions() {
  return async (dispatch) => {
    dispatch(requestQuestions());
    const token = localStorage.getItem('token');
    const { results } = await getApiTrivia(token);
    dispatch(getQuestions(results.map((questionData) => decodeQuestion(questionData))));
  };
}
