import { GenericStorageContainer } from "./GenericStorageContainer";
import { SubtleStorage } from "./SubtleStorage";

interface StubStorageInterface {
    /**
     * Create a new instance of `GenericStorageContainer` class.
     * @param storage 
     * @returns 
     */
    createGenericStorageContainer(storage: Storage): GenericStorageContainer
}

export class StubStorage implements StubStorageInterface {
    /**
     * A read-only property returns a `SubtleStorage` which can then be used to perform subtle storage operations.
     */
    public subtle = new SubtleStorage() as Readonly<SubtleStorage>

    public createGenericStorageContainer(storage: Storage) {
        return new GenericStorageContainer(storage)
    }
}
