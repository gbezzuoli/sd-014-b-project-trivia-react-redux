import md5 from 'crypto-js/md5';

export default function getGravatar(email) {
  const getHash = md5(email).toString();
  return getHash;
}
