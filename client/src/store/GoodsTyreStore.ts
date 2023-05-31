import {makeAutoObservable} from 'mobx';

export default class GoodsTyreStore {
    _types: {}[];
    _brands: {}[];
    _models: {}[];
    _season:{}[];
    _diameter: {}[];
    _tyres: [];
    _descriptions: {};
    _offset: number;
    constructor() {  
         this._types = [];
        this._brands = [];
        this._models = [];
        this._tyres = [];
        this._descriptions = {};
        this._season = [];
        this._diameter = [];
        this._offset = 0;
        makeAutoObservable(this);
    }

    setTypes(types: any[]) {
        this._types = types;
    }
    setBrands(brands: any[]) {
        this._brands = brands;
    }
    setModels(models: any[]) {
        this._models = models;
    }
    setTyres(tyres:[]) {
        this._tyres = tyres;
    }
    setDescription(descriptions: {}) {
        this._descriptions = descriptions;
    }

    setDiameter(diameters: any[]) {
        this._diameter = diameters;
    }

    setOffset(offset: number) {
        this._offset = offset;
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
    get tyres() {
        return this._tyres;
    }
    get descriptions() {
        return this._descriptions;
    }
    get diameter() {
        return this._diameter;
    }
    get offset() {
        return this._offset;
    }
}