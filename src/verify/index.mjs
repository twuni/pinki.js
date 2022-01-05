import { createHash, createPublicKey, createVerify } from 'crypto';

export const Command = Object.freeze({
  execute: (key = '', signature = '') => {
    const [version, fingerprint, algorithm, hash] = signature.split(':');

    if (version !== 'v1') {
      return Promise.reject(new Error(`Unsupported Signature Version: ${version}`));
    }

    const publicKey = createPublicKey({
      encoding: 'utf8',
      format: 'pem',
      key
    });

    const actualFingerprint = createHash('SHA256').update(publicKey.export({ format: 'pem', type: 'spki' })).digest('base64');

    if (fingerprint !== actualFingerprint) {
      return Promise.reject(new Error(`Key Mismatch! Fingerprint in signature (${fingerprint}) does not match the fingerprint of the given key (${actualFingerprint}).`));
    }

    const verifier = createVerify(algorithm);

    return new Promise((resolve, reject) => {
      process.stdin.on('readable', () => {
        for (let chunk = process.stdin.read(); chunk !== null; chunk = process.stdin.read()) {
          verifier.write(chunk);
        }
      });

      process.stdin.on('end', () => {
        try {
          verifier.end();

          const isVerified = verifier.verify(publicKey, hash, 'base64');

          if (!isVerified) {
            throw new Error('Bad Signature!');
          }

          resolve('OK\n');
        } catch (error) {
          reject(error);
        }
      });
    });
  }
});

export default Command;
