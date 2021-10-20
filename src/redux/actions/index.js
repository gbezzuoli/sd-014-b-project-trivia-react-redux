export const SET_INFO = 'SET_INFO';

export const setInfo = (info) => ({
  type: SET_INFO,
  userName: info.name,
  avatar: info.avatar,
  score: info.score,
});
