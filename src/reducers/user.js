// Esse reducer será responsável por tratar as informações da pessoa usuária
const initialState = { email: '', name: '' };

function user(state = initialState, action) {
  switch (action.type) {
  case 'USER':
    localStorage.setItem('state', JSON.stringify({
      player: {
        name: action.data.name,
        assertions: 0,
        score: 0,
        gravatarEmail: action.data.email,
      },
    }));
    return action.data;
  default:
    return state;
  }
}

export default user;
