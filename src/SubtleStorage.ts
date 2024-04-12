import { GetItemMethodContract } from "./contracts/GetItemMethodContract";
import { SetItemMethodContract } from "./contracts/SetItemMethodContract";
import { RemoveItemMethodContract } from "./contracts/RemoveItemMethodContract";

interface SubtleStorageInterface {
    /**
     * Get an item from the storage.
     * @param container 
     * @param key 
     */
    getItem<T = any>(container: GetItemMethodContract, key: string): Promise<T | null>

    /**
     * Set an item in the storage.
     * @param container 
     * @param key 
     * @param value 
     */
    setItem<T = any>(container: SetItemMethodContract, key: string, value: T): Promise<T | null>

    /**
     * Remove an item from the storage.
     * @param container 
     * @param key 
     */
    removeItem<T = any>(container: RemoveItemMethodContract, key: string): Promise<T | null>
}

export class SubtleStorage implements SubtleStorageInterface {
    public getItem<T = any>(container: GetItemMethodContract, key: string): Promise<T | null> {
        return container.getItem<T>(key)
    }

    public setItem<T = any>(container: SetItemMethodContract, key: string, value: T): Promise<T | null> {
        return container.setItem<T>(key, value)
    }

    public removeItem<T = any>(container: RemoveItemMethodContract, key: string): Promise<T | null> {
        return container.removeItem<T>(key)
    }

    static isSecureContext() {
        return (window || { isSecureContext: true }).isSecureContext
    }
}
