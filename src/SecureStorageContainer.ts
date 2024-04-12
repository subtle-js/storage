import { StorageContainerInterface } from "./interfaces"
import { getDecryptionKey } from "./utils/getDecryptionKey"
import { getEncryptionKey } from "./utils/getEncryptionKey"
import { transformArrayBufferToHexString } from "./utils/transformArrayBufferToHexString"
import { transfromHexStringToArrayBuffer } from "./utils/transfromHexStringToArrayBuffer"

export class SecureStorageContainer implements StorageContainerInterface {
    #keypair: CryptoKeyPair

    #textEncoder = new TextEncoder()
    #textDecoder = new TextDecoder()

    constructor(
        keypair: CryptoKeyPair,
        private container: StorageContainerInterface,
    ) {
        if ("RSA-OAEP" !== keypair.privateKey.algorithm.name) {
            throw new Error("[SecureStorageContainer]: Invalid algorithm! Expected 'RSA-OAEP'")
        }

        if ('privateKey' in keypair && 'publicKey' in keypair) {
            console.assert(keypair.publicKey.usages.includes("encrypt"), "[SecureStorageContainer]: The Public Key should have 'encrypt' usage!")
            console.assert(keypair.privateKey.usages.includes("decrypt"), "[SecureStorageContainer]: The Private Key should have 'encrypt' usage!")
        } else {
            throw new Error("[SecureStorageContainer]: Invalid Crypto Key!")
        }

        this.#keypair = keypair
    }

    async getItem<T = any>(key: string): Promise<T | null> {
        /**
         * 1. Retrieve the encrypted string from the container
         * 2. Decrypt the encrypted string using the cryptoKey
         * 3. Decode the decrypted data into a string
         * 4. Parse the string into an object
         * 5. Return the object
        */
        const encryptedString = await this.container.getItem(key)
        if (!encryptedString) {
            return null
        }
        try {
            const encryptedData = transfromHexStringToArrayBuffer(encryptedString)
            const decryptKey = getDecryptionKey(this.#keypair)
            try {
                const decryptedData = await window.crypto.subtle.decrypt(decryptKey.algorithm, decryptKey, encryptedData)
                const decryptedString = this.#textDecoder.decode(decryptedData)
                const value = JSON.parse(decryptedString)
                return value
            } catch {
                throw new Error("[SecureStorageContainer]: Unable to decrypt the data!")
            }
        } catch {
            throw new Error("[SecureStorageContainer]: Unable to decode the data for decryption!")
        }
    }

    async setItem<T = any>(key: string, value: T): Promise<T | null> {
        /**
         * 1. Serialize the value to a string
         * 2. Encode the value into a Uint8Array
         * 3. Encrypt the value using the cryptoKey
         * 4. Convert the encrypted data to a hex string
         * 5. Store the encrypted string in the container
         */
        try {
            const transformedValue = JSON.stringify(value)
            const encodedValue = this.#textEncoder.encode(transformedValue)
            const encryptKey = getEncryptionKey(this.#keypair)
            try {
                const encryptedData = await window.crypto.subtle.encrypt(encryptKey.algorithm, encryptKey, encodedValue)
                const encryptedString = transformArrayBufferToHexString(encryptedData)
                await this.container.setItem(key, encryptedString)
                return value
            } catch {
                throw new Error("[SecureStorageContainer]: Unable to encrypt the data!")
            }
        } catch {
            throw new Error("[SecureStorageContainer]: Unable to encode the data for encryption!")
        }
    }

    async removeItem<T = any>(key: string): Promise<T | null> {
        const item = await this.getItem(key)
        if (item) {
            this.container.removeItem(key)
        }
        return item
    }
}
