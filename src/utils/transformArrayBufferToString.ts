/**
 * Convert  an ArrayBuffer into a string
 * @param buf 
 * @returns 
 * @see https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
 */
export function ab2str(buf: ArrayBuffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buf) as any as number[]);
}

export const transformArrayBufferToString = ab2str
