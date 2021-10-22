export const GET_QUESTIONS = 'GET_QUESTIONS'

const getQuestions = (payload) => {
  return{
    type: GET_QUESTIONS,
    payload,
  }
}

export const fetchQuestions = () => {
  return(dispatch) => {
    const url = 
      'https://opentdb.com/api.php?amount=5&token='
    return fetch(`${url}${JSON.parse(localStorage.getItem('token'))}`)
      .then((response) => response.json())
        .then(
          (result) => dispatch(getQuestions(result))
        )
  }
}