import md5 from 'crypto-js/md5';

const getAvatarImg = (email) => {
  const hash = md5(email.trim().toLowerCase()).toString();
  const profileImageURL = `https://www.gravatar.com/avatar/${hash}`;
  return profileImageURL;
};

export default getAvatarImg;

// GERAR HASH https://br.gravatar.com/site/implement/hash/

// INSTALAÇÃO CRYPTO https://github.com/brix/crypto-js
