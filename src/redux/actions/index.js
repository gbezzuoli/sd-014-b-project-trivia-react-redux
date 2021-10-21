export const SUBMIT_USER = 'SUBMIT_USER';

export const submitUser = (name, hashGravatar) => ({
  type: SUBMIT_USER,
  name,
  hashGravatar,
});
