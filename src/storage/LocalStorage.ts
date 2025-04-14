import {Storage} from "./Storage.ts";

export class LocalStorage implements Storage {
    getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
}