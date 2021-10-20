const INITIAL_STATE = {
  name: '',
  email: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  profilePicture: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case '':
    return {};
  default:
    return state;
  }
};

export default user;
