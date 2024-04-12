import { SubtleStorage } from "./SubtleStorage";
import { DefinedStorageContainer } from "./internal/DefinedStorageContainer";
import { GenericStorageContainer } from "./GenericStorageContainer";
import { StorageContainerInterface } from "./interfaces/StorageContainerInterface";
import { InternalStorage } from "./internal/InternalStorage";
import { SecureStorageContainer } from "./SecureStorageContainer";

interface SandboxStorageInterface {
    /**
     * Create a new instance of `GenericStorageContainer` class.
     * @param storage 
     * @returns 
     */

    createGenericStorageContainer(storage: Storage): GenericStorageContainer
    /**
     * Create a new instance of `SecureStorageContainer` class.
     * 
     * Available only in secure contexts.
     * 
     * @param storage 
     * @returns 
     */
    createSecureStorageContainer(keypair: CryptoKeyPair, container: StorageContainerInterface): SecureStorageContainer

    /**
     * Define a new instance of `StorageContainerInterface` class.
     * @param definition 
     * @returns 
     */
    defineStorageContainer(definition: StorageContainerInterface): StorageContainerInterface
}

export class SandboxStorage extends InternalStorage implements SandboxStorageInterface {
    public createGenericStorageContainer(storage: Storage) {
        return new GenericStorageContainer(storage)
    }

    public createSecureStorageContainer(keypair: CryptoKeyPair, container: StorageContainerInterface) {
        if (!SubtleStorage.isSecureContext()) {
            throw new Error("[SubtleStorage]: SecureStorageContainer is only available in secure contexts!")
        }
        return new SecureStorageContainer(keypair, container)
    }

    public defineStorageContainer(definition: StorageContainerInterface): StorageContainerInterface {
        return new DefinedStorageContainer(definition)
    }
}
