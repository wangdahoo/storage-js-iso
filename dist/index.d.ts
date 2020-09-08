export default class Storage {
    static get (key: string): any
    static set (key: string, value: any): boolean
    static remove (key: string): void
    static clear (): void
    static on (key: string, fn: () => void): void
    static off (key: string, fn: () => void): void
}
