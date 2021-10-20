const INICIAL_STATE = {
  name: '',
  email: '',
};

function userReducer(state = INICIAL_STATE, action) {
  switch (action.type) {
  case 'SET_USER':
    return {
      ...state,
      name: action.payload.name,
      email: action.payload.email,
    };
  default:
    return state;
  }
}

export default userReducer;
