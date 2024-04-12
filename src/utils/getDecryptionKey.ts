export function getDecryptionKey(key: CryptoKey | CryptoKeyPair) {
    return key instanceof CryptoKey ? key : key.privateKey
}
