const initialState = { token: '' };

function token(state = initialState, action) {
  switch (action.type) {
  case 'TOKEN':
    localStorage.setItem('token', action.payload.token);
    return {
      ...state,
      token: action.payload.token,
    };
  default:
    return state;
  }
}

export default token;
