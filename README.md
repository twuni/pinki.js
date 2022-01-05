# Pinki

Pinki helps developers ship software with authenticity.

Use it anywhere you would use `gpg`.

## Installing

```
npm install pinki
```

## Usage

Pinki is designed to make it easy for you to do one of two things:

 * **Sign** your software so other people can verify its authenticity, or

 * **Verify** the authenticity of software you are using when the developers
   are using Pinki.

### Signing your software with Pinki

First, you'll need a private key. To create a new key with the
recommended (default) options:

```sh
$ pinki key
-----BEGIN PRIVATE KEY-----
...............................................................
...............................................................
...............................................................
-----END PRIVATE KEY-----
```

Save the output somewhere safe. Put it in your password manager,
vault, or whatever you are using to keep sensitive information
safe.

Once you have a private key, you will need to *export* that in a
way that is safe for people to verify your signatures:

```sh
$ pinki key export "$(cat /path/to/your-pinki-private-key)"
-----BEGIN PUBLIC KEY-----
...............................................................
...............................................................
-----END PUBLIC KEY-----
```

Publish this public key somewhere that anyone you want to be able
to verify your signatures is able to access it. You can commit it
to your source code repo, publish it to your website, etc.

> :bulb: The **public key** is not sensitive! You can safely share
> it with anyone.

Now that you have a private key, you're ready to sign your first thing!

```sh
$ pinki sign "$(cat /path/to/your-pinki-private-key)" < /path/to/your-thing-1.2.3.tar.gz
-----BEGIN SIGNATURE-----
...............................................................
...............................................................
-----END SIGNATURE-----
```

Publish that signature any way you like. Conventionally, you might want to
publish it as a file with the same name as the thing you've signed, but with
a **.sig** suffix. So **foo-1.0.tgz** would have its signature in
**foo-1.0.tgz.sig**. The choice is up to you.

### Verifying a signature with Pinki

To verify a signature, you'll need three things:

 * The thing that was signed (e.g: **foo-1.2.3.tgz**)
 * The signature (e.g: **foo-1.2.3.tgz.sig**)
 * The public key of the signer (e.g: **foomaker-signing-key.pem**)

Check the release notes or installation/verification documentation of the
thing you're trying to verify for more details on where to find these things.

Once you have them, here's how you verify the thing is authentic!

```sh
$ pinki verify "$(cat /path/to/signing-key)" "$(cat /path/to/signature)" < /path/to/thing-that-was-signed
OK
```

The command will exit with status code 0 and print "OK" on success.
Otherwise, it will exit with status code 1 and print an error message.
