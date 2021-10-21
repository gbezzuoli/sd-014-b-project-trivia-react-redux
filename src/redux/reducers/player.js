const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
};

function playerReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return ({ });
  default:
    return state;
  }
}

export default playerReducer;
