import { createPublicKey } from 'crypto';

export const Command = Object.freeze({
  execute: () => new Promise((resolve, reject) => {
    const chunks = [];

    process.stdin.setEncoding('utf8');

    process.stdin.on('readable', () => {
      for (let chunk = process.stdin.read(); chunk !== null; chunk = process.stdin.read()) {
        chunks.push(chunk);
      }
    });

    process.stdin.on('end', () => {
      try {
        resolve(createPublicKey({
          encoding: 'utf8',
          format: 'pem',
          key: chunks.join('')
        }).export({
          format: 'pem',
          type: 'spki'
        }));
      } catch (error) {
        reject(error);
      }
    });
  })
});

export default Command;
