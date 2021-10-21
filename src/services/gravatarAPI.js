import md5 from 'crypto-js/md5';

const fetchAvatar = async (emailUser) => {
  const HASH = md5(emailUser).toString();
  console.log(HASH);
  const URL = `https://www.gravatar.com/avatar/${HASH}`;
  //return URL;
  const response = await fetch(URL);
  const responseURL = response.url;
  return responseURL;
};

// const fetchAvatar = (email) => {
//   const Hash = md5(email).toString();
//   return () => {
//     fetch(`https://www.gravatar.com/avatar/${Hash}`)
//       .then((response) => response.json())
//       .then((resolve) => console.log(resolve))
//       .catch((err) => err);
//   };
// };

export default fetchAvatar;
