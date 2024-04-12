import { StorageContainerInterface } from "./interfaces";

export class GenericStorageContainer implements StorageContainerInterface {
    constructor(private storage: Storage) {
        // ...
    }

    async getItem<T = any>(key: string): Promise<T | null> {
        const item = this.storage.getItem(key)
        return item as T
    }

    async setItem<T = any>(key: string, value: T): Promise<T | null> {
        this.storage.setItem(key, value as string)
        return this.getItem(key)
    }

    async removeItem<T = any>(key: string): Promise<T | null> {
        const item = await this.getItem(key)
        if (item) {
            this.storage.removeItem(key)
        }
        return item
    }
}
