import {makeAutoObservable} from 'mobx';

export default class GoodsOilStore {
    _types: {}[];
    _brands: {}[];
    _oils: {}[];
    constructor() {  
         this._types = [
           
        ];
        this._brands = [

        ];
        this._oils = [
          
        ];
        makeAutoObservable(this, {});
    }

    setTypes(types: any[]) {
        this._types = types;
    }
    setBrands(brands: any[]) {
        this._brands = brands;
    }
    setOils(oils: any[]) {
        this._oils = oils;
    }
    get types() {
        return this._types;
    }
    get brands() {
        return this._brands;
    }
    get oils() {
        return this._oils;
    }
}