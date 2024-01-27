import {makeAutoObservable} from 'mobx';

export default class LanguageStore {
    _language: string;
    constructor() { 
        this._language = 'ua';
        makeAutoObservable(this);
    }

    setLanguage(language: string) {
        this._language = language;
    }

    get language() {
        return this._language;
    }
}