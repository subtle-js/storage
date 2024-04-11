export interface SetItemMethodContract {
    /**
     * Set an item in the storage
     * @param key 
     * @param value 
     */
    setItem<T = any>(key: string, value: T): Promise<T | null>
}
