// Get user Gravatar
import md5 from 'crypto-js/md5'; // ATENÇÃO - NO TERMINAL, RODAR O COMANDO: npm install crypto-js

export default async function getGravatar(userEmail) {
  const hashUserEmail = md5(userEmail).toString();
  const userGravatar = await fetch(`https://www.gravatar.com/avatar/${hashUserEmail}`);
  return userGravatar;
}
