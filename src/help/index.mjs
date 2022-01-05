export const Command = Object.freeze({
  execute: () => Promise.resolve(`
USAGE: pki-cli <command>

COMMANDS:

  key create <type> ...
  Generate an asymmetric key-pair for encryption, signing, or key exchange.

    TYPES:

      ec [<curve>]
      Generate an elliptic curve (EC) key-pair.

        OPTIONS:

        curve
        Defaults to "secp384r1".

  key export
  Output the public key of the private key provided via standard input.

  key fingerprint
  Output the fingerprint of the private or public key provided via standard input.
  The fingerprint is the base64-encoded SHA256 hash of the public key in
  PEM format.

  sign <key>
  Sign the data provided via standard input using the given private key,
  printing the resulting signature to standard output.

  verify <key> <signature>
  Verify the given signature for the data provided via standard input using
  the given public key. Exits with status code 0 on success, or 1 on failure.

`)
});

export default Command;
