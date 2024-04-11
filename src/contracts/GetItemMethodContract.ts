export interface GetItemMethodContract {
    /**
     * Get an item from the storage
     * @param key
     */
    getItem<T = any>(key: string): Promise<T | null>
}
