export function transfromHexStringToArrayBuffer(hexString: string): ArrayBuffer {
    const buffer = new ArrayBuffer(hexString.length / 2)
    const view = new DataView(buffer)
    for (let i = 0; i < hexString.length; i += 2) {
        view.setUint8(i / 2, parseInt(hexString.substring(i, i + 2), 16))
    }
    return buffer
}
