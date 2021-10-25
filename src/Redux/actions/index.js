export const SAVE_PLAYER_INFO = 'SAVE_PLAYER_INFO';
export const SAVE_URL_GRAVATAR = 'SAVE_URL_GRAVATAR';

export const savePlayerAction = (player) => ({
  type: 'SAVE_PLAYER_INFO',
  player,
});

export const saveUrlGravatarAction = (gravatarUrl) => ({
  type: 'SAVE_URL_GRAVATAR',
  gravatarUrl,
});
