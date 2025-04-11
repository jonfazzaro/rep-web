export class SessionStore {
    private readonly _key = 'rep_sessions';

    constructor(private readonly storage: Storage = new LocalStorage()) {
        this.storage = storage;
    }

    static createNull(seed:Record<string, string> = {}) {
        return new SessionStore(new NullStorage(seed))
    }

    save(session: SavedSession) {
        const list = this.read();
        this.storage.setItem(this._key, JSON.stringify(list.concat(session)));
    }

    read(): SavedSession[] {
        return JSON.parse(this.storage.getItem(this._key) ?? "[]", dateReviver)

        function dateReviver(_key: string, value: string) : Date | string {
            return isDateString(value) ? new Date(value) : value;

            function isDateString(value: string) {
                const dateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
                return typeof value === "string" && dateFormat.test(value)
            }
        }
    }
}

export interface SavedSession {
    count: number;
    start: Date | null;
    end: Date | null;
}

interface Storage {
    getItem(key: string): string | null;

    setItem(key: string, value: string): void;
}

class LocalStorage implements Storage {
    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
}

class NullStorage implements Storage {
    private readonly data: Record<string, string>;

    constructor(seed:Record<string, string> = {}) {
        this.data = seed
    }

    getItem(key: string): string | null {
        return this.data[key] || null
    }

    setItem(key: string, value: string): void {
        this.data[key] = value
    }
}