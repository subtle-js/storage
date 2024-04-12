export function transformArrayBufferToHexString(buffer: ArrayBufferLike): string {
    return Array.from(new Uint8Array(buffer))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('')
}
