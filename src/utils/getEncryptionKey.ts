export function getEncryptionKey(key: CryptoKey | CryptoKeyPair) {
    return key instanceof CryptoKey ? key : key.publicKey
}
