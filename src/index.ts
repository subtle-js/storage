import { SandboxStorage } from "./SandboxStorage";

/**
 * A read-only property returns an `ExternalStorage` which can then be used to perform storage operations.
 */
export const storage = new SandboxStorage()
