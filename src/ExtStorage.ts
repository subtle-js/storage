import { SubtleStorage } from "./SubtleStorage";
import { DefinedStorageContainer } from "./internal/DefinedStorageContainer";
import { GenericStorageContainer } from "./GenericStorageContainer";
import { StorageContainerInterface } from "./interfaces/StorageContainerInterface";
import { InternalStorage } from "./internal/InternalStorage";

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

export class ExtStorage extends InternalStorage implements ExtStorageInterface {
    public createGenericStorageContainer(storage: Storage) {
        return new GenericStorageContainer(storage)
    }

    public defineStorageContainer(definition: StorageContainerInterface): StorageContainerInterface {
        return new DefinedStorageContainer(definition)
    }
}
