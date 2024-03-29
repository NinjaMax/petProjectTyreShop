import {makeAutoObservable} from 'mobx';

export default class PageStore {
    _offset: number;
    _limit: number;
    _pageItem: number;
    _id: string;
    _loadMore:number;
    _basket_count:number;
    _questions_count:number;
    _favorites_count:string[];
    _comparison_count:string[];

    constructor() { 
        this._offset = 0;
        this._limit = 9;
        this._pageItem = 0;
        this._id = '0';
        this._loadMore = 0;
        this._basket_count = 0;
        this._questions_count = 0;
        this._favorites_count = [];
        this._comparison_count = [];
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
    setQuestionsCount(question_count: number) {
        this._questions_count = question_count;
    }
    setFavoritesCount(favorites_count: string[]) {
        this._favorites_count = favorites_count;
    }

    setComparisonCount(comparison_count: string[]) {
        this._comparison_count = comparison_count;
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
    get questionsCount() {
        return this._questions_count;
    }
    get favoritesCount() {
        return this._favorites_count;
    }
    get comparisonCount() {
        return this._comparison_count;
    }
}