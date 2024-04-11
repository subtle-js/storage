import { SubtleStorage } from "./SubtleStorage";
import { GenericStorageContainer } from "./GenericStorageContainer";
import { StorageContainerInterface } from "./interfaces/StorageContainerInterface";

interface ExtStorageInterface {
    /**
     * Create a new instance of `GenericStorageContainer` class.
     * @param storage 
     * @returns 
     */
    createGenericStorageContainer(storage: Storage): GenericStorageContainer

    /**
     * Define a new instance of `StorageContainerInterface` class.
     * @param definition 
     * @returns 
     */
    defineStorageContainer(definition: StorageContainerInterface): StorageContainerInterface
}

export class ExtStorage implements ExtStorageInterface {
    /**
     * A read-only property returns a `SubtleStorage` which can then be used to perform subtle storage operations.
     */
    public subtle = new SubtleStorage() as Readonly<SubtleStorage>

    public createGenericStorageContainer(storage: Storage) {
        return new GenericStorageContainer(storage)
    }

    public defineStorageContainer(definition: StorageContainerInterface): StorageContainerInterface {
        return {
            async getItem(key) {
                if (!definition.getItem) {
                    return Promise.reject(new Error('[StorageContainerInterface]: GetItem method is not implemented.'))
                }
                return definition.getItem(key)
            },
            setItem(key, value) {
                if (!definition.setItem) {
                    return Promise.reject(new Error('[StorageContainerInterface]: SetItem method is not implemented.'))
                }
                return definition.setItem(key, value)
            },
            removeItem(key) {
                if (!definition.removeItem) {
                    return Promise.reject(new Error('[StorageContainerInterface]: RemoveItem method is not implemented.'))
                }
                return definition.removeItem(key)
            },
        }
    }
}
