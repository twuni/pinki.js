import { createHash, createPrivateKey, createPublicKey, createSign } from 'crypto';

export const VERSION = 'v1';

export const Command = Object.freeze({
  execute: (key) => new Promise((resolve, reject) => {
    const signer = createSign('SHA256');

    const fingerprint = createHash('SHA256').update(createPublicKey({
      encoding: 'utf8',
      format: 'pem',
      key
    }).export({
      format: 'pem',
      type: 'spki'
    })).digest('base64');

    process.stdin.on('readable', () => {
      for (let chunk = process.stdin.read(); chunk !== null; chunk = process.stdin.read()) {
        signer.write(chunk);
      }
    });

    process.stdin.on('end', () => {
      signer.end();
      try {
        const hash = signer.sign(createPrivateKey({
          encoding: 'utf8',
          format: 'pem',
          key
        }), 'base64');
        resolve(`${VERSION}:${fingerprint}:SHA256:${hash}\n`);
      } catch (error) {
        reject(error);
      }
    });
  })
});

export default Command;
