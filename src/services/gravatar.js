import { MD5 } from 'crypto-js';

function getProfile(email) {
  const hash = MD5(email).toString();

  const gravatarImage = `https://www.gravatar.com/avatar/${hash}`;
  return gravatarImage;
}

export default getProfile;
