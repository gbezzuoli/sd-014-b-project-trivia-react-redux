import md5 from 'crypto-js/md5';

const fetchAvatar = async (emailUser) => {
  const HASH = md5(emailUser).toString();
  const URL = `https://www.gravatar.com/avatar/${HASH}`;
  const response = await fetch(URL);
  const responseURL = response.url;
  return responseURL;
};

export default fetchAvatar;
