import { SubtleStorage } from "../SubtleStorage"
import { __SUBTLEJS_AUTH_NAME, __SUBTLEJS_AUTH_VERSION } from "./package"

export class InternalStorage {
    private readonly __SUBTLEJS_PKG_NAME: string = __SUBTLEJS_AUTH_NAME
    private readonly __SUBTLEJS_PKG_VERSION: string = __SUBTLEJS_AUTH_VERSION

    /**
     * A read-only property returns a `SubtleStorage` which can then be used to perform subtle storage operations.
     */
    public readonly subtle = new SubtleStorage() as Readonly<SubtleStorage>
}
