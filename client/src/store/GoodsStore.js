import {makeAutoObservable} from 'mobx';

export default class GoodsStore {
    constructor() {
        this._types = [
            {id: 1, name: 'Легковые'},
            {id: 2, name: 'Микроавтобус'},
            {id: 3, name: 'Внедорожник'}               
        ],
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setUser(user) {
        this._user = user;
    }
    get isAuth() {
        return this._isAuth;
    }
    get user() {
        return this._user;
    }
}