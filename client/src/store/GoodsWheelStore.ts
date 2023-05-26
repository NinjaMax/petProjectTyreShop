import {makeAutoObservable} from 'mobx';

export default class GoodsWheelStore {
    _types: {}[];
    _brands: {}[];
    _wheels: {}[];
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
        this._wheels = [
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
    setTyres(wheels: any[]) {
        this._wheels = wheels;
    }
    get types() {
        return this._types;
    }
    get brands() {
        return this._brands;
    }
    get wheels() {
        return this._wheels;
    }
}