import {makeAutoObservable} from 'mobx';

export default class PageStore {
    _offset: number;
    //_: {};
    constructor() { 
        this._offset = 0;
        //this._user = {};
        makeAutoObservable(this);
    }

    setOffset(offset: number) {
        this._offset = offset;
    }
    // setUser(_user: {}) {
    //     this._user = _user;
    // }

    get offset() {
        return this._offset;
    }
    // get user() {
    //     return this._user;
    // }
}