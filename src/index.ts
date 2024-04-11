import { StubStorage } from "./Storage";

/**
 * A read-only property returns an `StubStorage` which can then be used to perform storage operations.
 */
export const storage = new StubStorage()
