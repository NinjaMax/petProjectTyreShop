import {makeAutoObservable} from 'mobx';

export default class PageStore {
    _offset: number;
    _id: string;
    constructor() { 
        this._offset = 0;
        this._id = '0';
        makeAutoObservable(this);
    }

    setOffset(offset: number) {
        this._offset = offset;
    }
    setId(id: string) {
        this._id = id;
    }

    get offset() {
        return this._offset;
    }
    get id() {
        return this._id;
    }
}