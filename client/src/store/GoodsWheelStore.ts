import {makeAutoObservable} from 'mobx';

export default class GoodsWheelStore {
    _wheels: {}[];
    _width: string[];
    _types: string[];
    _brands: string[];
    _models: string[];
    _bolt_count: string[];
    _diameter: string[];
    _type: string[];
    _bolt_count_pcd:string[];
    _color:string[];
    _dia:string[];
    _et: string[];
    _pcd: string[];
    _pcd2: string[];
    _descriptions: {};
    _wheels_filter: [];
    _product: {} | null;
    _totalCount: number;
    _ratingList:{[key: string]: number};
    constructor() {  
        this._wheels = [];
        this._types = [];
        this._brands = [];
        this._models = [];
        this._descriptions = {};
        this._bolt_count = [];
        this._diameter = [];
        this._wheels_filter = [];
        this._product = null;
        this._totalCount = 0;
        this._type = [];
        this._bolt_count_pcd = [];
        this._color = [];
        this._dia = [];
        this._et  = [];
        this._pcd  = [];
        this._pcd2  = [];
        this._width = [];
        this._ratingList = {
            rating_overall: 0,
        };

        makeAutoObservable(this, {});
    }

    setWheels(wheels:[]) {
        this._wheels = wheels;
    }
    setTypes(types: string[]) {
        this._types = types;
    }
    setBrands(brands: string[]) {
        this._brands = brands;
    }
    setWidth(width: string[]) {
        this._width = width;
    }
    setModels(models: string[]) {
        this._models = models;
    }
    setDescription(descriptions: {}) {
        this._descriptions = descriptions;
    }
    setDiameter(diameters: string[]) {
        this._diameter = diameters;
    }
    setWheelsFilter(wheels_filter: []) {
        this._wheels_filter = wheels_filter;
    }
    setProduct(product: {}) {
        this._product = product;
    }
    setTotalCount(totalCount: number) {
        this._totalCount = totalCount;
    }
    setType(type: string[]) {
        this._type = type;
    }
    setBoltCount(bolt_count: string[]) {
        this._bolt_count = bolt_count;
    }
    setBoltCountPcd(bolt_count_pcd: string[]) {
        this._bolt_count_pcd = bolt_count_pcd;
    }
    setColor(color: string[]) {
        this._color = color;
    }
    setDia(dia: string[]) {
        this._dia = dia;
    }
    setEt(et: string[]) {
        this._et  = et;
    }
    setPcd(pcd: string[]) {
        this._pcd  = pcd;
    }
    setPcd2(pcd2: string[]) {
        this._pcd2 = pcd2;
    }
    setRatingList(ratingList:{}) {
        this._ratingList = ratingList;
    }
  
    get types() {
        return this._types;
    }
    get brands() {
        return this._brands;
    }
    get models() {
        return this._models;
    }
    get wheels() {
        return this._wheels;
    }
    get bolt_count() {
        return this._bolt_count;
    }
    get descriptions() {
        return this._descriptions;
    }
    get diameter() {
        return this._diameter;
    }
    get tyres_filter() {
        return this._wheels_filter;
    }
    get type() {
        return this._type;
    }
    get bolt_count_pcd() {
        return this._bolt_count_pcd;
    }
    get color() {
        return this._color;
    }
    get load_index() {
        return this._dia;
    }
    get et() {
        return this._et; 
    }
    get pcd() {
        return this._pcd; 
    }
    get pcd2() {
        return this._pcd2;
    }
    get product() {
        return this._product;
    }
    get totalCount() {
        return this._totalCount;
    }
    get ratingList() {
        return this._ratingList;
    }
    setNewRating(titleRating: string, newRating: string) {
        if (titleRating in this._ratingList) {
            this._ratingList[titleRating] = +newRating;
        }
    }
}