import {makeAutoObservable} from 'mobx';

export default class PageStore {
    _offset: number;
    _limit: number;
    _pageItem: number;
    _id: string;
    _loadMore:number;
    _basket_count:number;

    constructor() { 
        this._offset = 0;
        this._limit = 9;
        this._pageItem = 0;
        this._id = '0';
        this._loadMore = 0;
        this._basket_count = 0;
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
    setLoadMore(loadMore: number) {
        this._loadMore = loadMore;
    }
    setBasketCount(basket_count: number) {
        this._basket_count = basket_count;
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
    get loadMore() {
        return this._loadMore;
    }
    get basketCount() {
        return this._basket_count;
    }
}