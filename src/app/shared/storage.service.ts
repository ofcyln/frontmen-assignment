import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class StorageService {
    constructor() {
        if (typeof Storage === 'undefined') {
            throw 'StorageService: Local storage is not supported';
        }
    }

    public setObject(key: string, data: Object) {
        if (data != null) {
            localStorage.setItem(key, JSON.stringify(data));
        } else {
            localStorage.removeItem(key);
        }
    }

    public getObject(key: string): Object {
        const item = localStorage.getItem(key);
        return item && JSON.parse(item);
    }

    public removeObject(key: string) {
        this.removeItem(key);
    }

    public setItem(key: string, data: string): string {
        localStorage.setItem(key, data);
        return data;
    }

    public getItem(key: string): string {
        const data = localStorage.getItem(key);
        return data;
    }

    public removeItem(key: string) {
        localStorage.removeItem(key);
    }

    public getKeysByFilter(filterFn: Function) {
        const storageKeys = Object.keys(localStorage);
        return storageKeys.filter((key) => filterFn(key));
    }

    public clearLocalStorage() {
        const storageKeys = Object.keys(localStorage);

        storageKeys.forEach((key: string) => {
            this.removeItem(key);
        });
    }

    public removeSessionItem(key: string) {
        sessionStorage.removeItem(key);
    }

    public setSessionItem(key: string, data: string): string {
        sessionStorage.setItem(key, data);
        return data;
    }

    public getSessionItem(key: string): string {
        const data = sessionStorage.getItem(key);
        return data;
    }
}
