import {makeAutoObservable} from 'mobx';

export default class CustomersStore {
    _isAuth: boolean;
    _customer: {};
    constructor() { 
        this._isAuth = false;
        this._customer = {};
        makeAutoObservable(this);
    }

    setIsAuth(bool: boolean) {
        this._isAuth = bool;
    }
    setUser(_customer: {}) {
        this._customer = _customer;
    }

    get isAuth() {
        return this._isAuth;
    }
    get customer() {
        return this._customer;
    }
}