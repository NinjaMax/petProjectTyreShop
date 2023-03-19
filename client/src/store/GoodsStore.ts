import {makeAutoObservable} from 'mobx';

export default class GoodsStore {
    _types: { id: number; name: string; }[];
    _brands: { id: number; name: string; }[];
    _tyres: { id: number; name: string; price: number; rating: number; info: string; img: string; }[];
    constructor() {  
         this._types = [
            {id: 1, name: 'Легковые'},
            {id: 2, name: 'Микроавтобус'},
            {id: 3, name: 'Внедорожник'}               
        ];
        this._brands = [
            {id: 1, name: 'Michelin'},
            {id: 2, name: 'Bridgestone'},
            {id: 3, name: 'Continental'}
        ];
        this._tyres = [
            {id: 1, name: 'Легковые', price: 1500, rating: 5, info:"Шины легковые", img: 'https://tshina.ua/upload/iblock/f65/Winter-icept-iz2-w616.png'},
            {id: 2, name: 'Микроавтобус',  price: 1500, rating: 5, info:"Шины легковые", img: 'https://tshina.ua/upload/iblock/f65/Winter-icept-iz2-w616.png'},
            {id: 3, name: 'Внедорожник',  price: 1500, rating: 5, info:"Шины легковые", img: 'https://tshina.ua/upload/iblock/f65/Winter-icept-iz2-w616.png'}
        ];
        makeAutoObservable(this, {});
    }

    setTypes(types: { id: number; name: string; }[]) {
        this._types = types;
    }
    setBrands(brands: { id: number; name: string; }[]) {
        this._brands = brands;
    }
    setTyres(tyres: 
        { id: number; 
            name: string;
            price: number;
            rating: number;
            info: string;
            img: string; }[]) {
        this._tyres = tyres;
    }
    get types() {
        return this._types;
    }
    get brands() {
        return this._brands;
    }
    get tyres() {
        return this._tyres;
    }
}