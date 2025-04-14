import {dateReviver} from "../time/dates.ts";

export class SessionStore {
    private readonly _key = 'rep_sessions';

    constructor(private readonly storage: Storage = new LocalStorage()) {
        this.storage = storage;
    }

    static createNull(seed: Record<string, string> = {}) {
        return new SessionStore(new NullStorage(seed))
    }

    async save(session: SavedSession) {
        const list = await this.read();
        this.storage.setItem(this._key, JSON.stringify(list.concat(session)));
    }

    async read(): Promise<SavedSession[]> {
        return Promise.resolve(JSON.parse(this.storage.getItem(this._key) ?? "[]", dateReviver))
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

    constructor(seed: Record<string, string> = {}) {
        this.data = seed
    }

    getItem(key: string): string | null {
        return this.data[key] || null
    }

    setItem(key: string, value: string): void {
        this.data[key] = value
    }
}