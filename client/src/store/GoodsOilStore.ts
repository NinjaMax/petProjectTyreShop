import {makeAutoObservable} from 'mobx';

export default class GoodsOilStore {
    _types: {}[];
    _brands: {}[];
    _oils: {}[];
    constructor() {  
         this._types = [
            // {id: 1, name: 'Легковые'},
            // {id: 2, name: 'Микроавтобус'},
            // {id: 3, name: 'Внедорожник'}               
        ];
        this._brands = [
            // {id: 1, name: 'Michelin'},
            // {id: 2, name: 'Bridgestone'},
            // {id: 3, name: 'Continental'}
        ];
        this._oils = [
            // {id: 1, name: 'Легковые', price: 1500, rating: 5, info:"Шины легковые", img: 'https://tshina.ua/upload/iblock/f65/Winter-icept-iz2-w616.png'},
            // {id: 2, name: 'Микроавтобус',  price: 1500, rating: 5, info:"Шины легковые", img: 'https://tshina.ua/upload/iblock/f65/Winter-icept-iz2-w616.png'},
            // {id: 3, name: 'Внедорожник',  price: 1500, rating: 5, info:"Шины легковые", img: 'https://tshina.ua/upload/iblock/f65/Winter-icept-iz2-w616.png'}
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