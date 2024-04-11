export interface RemoveItemMethodContract {
    /**
     * Remove an item from the storage
     * @param key 
     */
    removeItem<T = any>(key: string): Promise<T | null>
}
