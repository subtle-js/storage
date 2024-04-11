import { GetItemMethodContract } from "./contracts/GetItemMethodContract";
import { SetItemMethodContract } from "./contracts/SetItemMethodContract";
import { RemoveItemMethodContract } from "./contracts/RemoveItemMethodContract";

export interface GenericStorageContainerInterface extends GetItemMethodContract, SetItemMethodContract, RemoveItemMethodContract { }

export class GenericStorageContainer implements GenericStorageContainerInterface {
    constructor(public storage: Storage) {}

    getItem<T = any>(key: string): Promise<T | null> {
        return Promise.resolve<T>(this.storage.getItem(key) as any)
    }

    setItem<T = any>(key: string, value: T): Promise<T | null> {
        return Promise.resolve<T>(this.storage.setItem(key, value as string) as any)
    }

    async removeItem<T = any>(key: string): Promise<T | null> {
        const item = await this.getItem(key)
        this.storage.removeItem(key)
        return item
    }
}
