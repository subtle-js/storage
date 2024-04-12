export function transformStringToHexString(value: string): string {
    return Array.from(value).map((char) => char.charCodeAt(0).toString(16)).join('')
}
