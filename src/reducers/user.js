// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = { email: '', name: '' };

function user(state = initialState, action) {
  switch (action.type) {
  case 'USER':
    return action.data;
  default:
    return state;
  }
}

export default user;
