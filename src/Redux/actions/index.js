export const SAVE_PLAYER_INFO = 'SAVE_PLAYER_INFO';

export const savePlayerAction = (player) => ({
  type: 'SAVE_PLAYER_INFO',
  player,
});
