import { StorageContainerInterface } from "./interfaces/StorageContainerInterface"

export class DefinedStorageContainer implements StorageContainerInterface {
    constructor(private definition: StorageContainerInterface) {
        // ...
    }

    async getItem<T = any>(key: string): Promise<T | null> {
        if (!this.definition.getItem) {
            return Promise.reject(new Error('[StorageContainerInterface]: GetItem method is not implemented.'))
        }
        return this.definition.getItem(key)
    }

    async setItem<T = any>(key: string, value: T): Promise<T | null> {
        if (!this.definition.setItem) {
            return Promise.reject(new Error('[StorageContainerInterface]: SetItem method is not implemented.'))
        }
        return this.definition.setItem(key, value)
    }

    async removeItem<T = any>(key: string): Promise<T | null> {
        if (!this.definition.removeItem) {
            return Promise.reject(new Error('[StorageContainerInterface]: RemoveItem method is not implemented.'))
        }
        return this.definition.removeItem(key)
    }
}
