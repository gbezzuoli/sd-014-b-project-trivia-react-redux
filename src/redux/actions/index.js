export const SUBMIT_PLAYER = 'SUBMIT_PLAYER';

export const submitPlayerAction = (player, token, email) => ({
  type: SUBMIT_PLAYER, player, token, email,
});
