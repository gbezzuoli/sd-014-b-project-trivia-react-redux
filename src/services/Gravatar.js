import md5 from 'crypto-js/md5';

const getAvatarImg = (email) => {
  const md5Email = md5(email.trim().toLowerCase()).toString();
  return `https://www.gravatar.com/avatar/${md5Email}`;
};

export default getAvatarImg;

// GERAR HASH https://br.gravatar.com/site/implement/hash/

// INSTALAÇÃO CRYPTO https://github.com/brix/crypto-js
