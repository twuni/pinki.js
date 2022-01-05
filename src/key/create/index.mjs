import { generateKeyPair } from 'crypto';

export const Command = Object.freeze({
  execute: (type = 'ec', namedCurve = 'secp384r1') => new Promise((resolve, reject) => {
    generateKeyPair(type, {
      namedCurve,
      privateKeyEncoding: {
        format: 'pem',
        type: 'pkcs8'
      },
      publicKeyEncoding: {
        format: 'pem',
        type: 'spki'
      }
    }, (error, publicKey, privateKey) => {
      if (error) {
        reject(error);
      }
      resolve(privateKey);
    });
  })
});

export default Command;
