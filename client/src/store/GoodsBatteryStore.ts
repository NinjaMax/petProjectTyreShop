import {makeAutoObservable} from 'mobx';

export default class GoodsBatteryStore {
    _types: {}[];
    _brands: {}[];
    _batteries: {}[];
    constructor() {  
         this._types = [
          
        ];
        this._brands = [

        ];
        this._batteries = [
         
        ];
        makeAutoObservable(this, {});
    }

    setTypes(types: any[]) {
        this._types = types;
    }
    setBrands(brands: any[]) {
        this._brands = brands;
    }
    setBatteries(batteries: any[]) {
        this._batteries = batteries;
    }
    get types() {
        return this._types;
    }
    get brands() {
        return this._brands;
    }
    get batteries() {
        return this._batteries;
    }
}