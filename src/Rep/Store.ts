export class Store {
    private readonly _key = 'data';
    
    constructor(private readonly storage: Storage = new LocalStorage()) {
        this.storage = storage;
    }
    
    static createNull(seed = {}) {
        return new Store(new NullStorage(seed))
    }

    save(data: object) {
        const saved = this.read();
        this.storage.setItem(this._key, JSON.stringify(saved.concat(data)));
    }

    read() {
        return JSON.parse(this.storage.getItem(this._key) ?? "[]")
    }
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
    
    constructor(seed = {}) {
        this.data = seed
    }
    
    getItem(key: string): string | null {
        return this.data[key] || null
    }
    setItem(key: string, value: string): void {
        this.data[key] = value
    }
}