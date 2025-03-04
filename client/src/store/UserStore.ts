import {makeAutoObservable} from 'mobx';

export default class UserStore {
    _isAuth: boolean;
    _user: {};
    constructor() { 
        this._isAuth = false;
        this._user = {};
        makeAutoObservable(this);
    }

    setIsAuth(bool: boolean) {
        this._isAuth = bool;
    }
    setUser(_user: {}) {
        this._user = _user;
    }

    get isAuth() {
        return this._isAuth;
    }
    get user() {
        return this._user;
    }
}