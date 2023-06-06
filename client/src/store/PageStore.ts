import {makeAutoObservable} from 'mobx';

export default class PageStore {
    _offset: number;
    _limit: number;
    _pageItem: number;
    _id: string;
    constructor() { 
        this._offset = 0;
        this._limit = 9;
        this._pageItem = 0;
        this._id = '0';
        makeAutoObservable(this);
    }

    setOffset(offset: number) {
        this._offset = offset;
    }
    setId(id: string) {
        this._id = id;
    }
    setLimit(limit: number) {
        this._limit = limit;
    }
    setPageItem(pageItem: number) {
        this._pageItem = pageItem;
    }


    get offset() {
        return this._offset;
    }
    get id() {
        return this._id;
    }

    get limit() {
        return this._limit;
    }
    get pageItem() {
        return this._pageItem;
    }
}