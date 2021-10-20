export const SUBMIT_PLAYER = 'SUBMIT_PLAYER';

export const submitPlayerAction = (player, token) => ({
  type: SUBMIT_PLAYER,
  player,
  token,
});
