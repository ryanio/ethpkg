# Key Generation

## Metamask
[Setup Metamask](https://youtu.be/ZIGUC9JAAw8?t=10) and create a dedicated code signing account.
Label it accordingly.

## Go Ethereum (Geth)

#### 1.) Download Binary & Verify (GPG)

```
wget https://gethstore.blob.core.windows.net/builds/geth-darwin-amd64-1.8.22-7fa3509e.tar.gz
wget https://gethstore.blob.core.windows.net/builds/geth-darwin-amd64-1.8.22-7fa3509e.tar.gz.asc
gpg --recv-keys 9BA28146 7B9E2481 D2A67EAC
gpg --verify geth-darwin-amd64-1.8.22-7fa3509e.tar.gz.asc
tar -xzf geth-darwin-amd64-1.8.22-7fa3509e.tar.gz
cd geth-darwin-amd64-1.8.22-7fa3509e
```

#### 2.) Create Code Signing Key
```
// create account
./geth account new
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase:
Repeat passphrase:
Address: {661e161dbea99a181f9e0293c916cda89102b1a4}

cd ~/Library/Ethereum/keystore/
// currently, no way to store additional metadata so we rename the keyfile
mv UTC--...--661e161dbea99a181f9e0293c916cda89102b1a4 codesign--661e161dbea99a181f9e0293c916cda89102b1a4
// private key now in => ~/Library/Ethereum/keystore/codesign--661e161dbea99a181f9e0293c916cda89102b1a4
```

## Open SSL

```
$ openssl ecparam -name secp256k1 -genkey -out ec-codesign-pk.pem
```

The private key should be in the armored PEM format and look like:

```
-----BEGIN EC PRIVATE KEY-----
MHQCAQEEIDdW8qpFrglyMikU8s5DhjtV9lgzmktp1foU+rfC2r/EoAcGBSuBBAAK
oUQDQgAEk2N1W00oI4VQIPC5++C/L4RAI8gyVSW7l/4ywPbli2yyOGfrdUNi7ra5
bHnZaspUTQtY3aN9tLMsKUP4T7tnjg==
-----END EC PRIVATE KEY-----
```

`WARNING:`
Do never share this file / key with anyone and please note that the key is NOT encrypted.
Therefore, you should not use the key for any financial transactions and ideally store it only on an internet-disconnected device.
