import {makeAutoObservable} from 'mobx';

export default class GoodsTyreStore {
    _tyres: [];
    _width: string[];
    _height: string[];
    _types: string[];
    _brands: string[];
    _models: string[];
    _season:string[];
    _diameter: string[];
    _vehicle_type: string[];
    _studded:string[];
    _speed_index:string[];
    _load_index:string[];
    _homologation:string[];
    _run_flat:string[];
    _reinforced:string[];
    _descriptions: {};
    _tyres_filter: [];
    _product: {};
    _totalCount: number;

    constructor() {  
        this._types = [];
        this._brands = [];
        this._models = [];
        this._tyres = [];
        this._descriptions = {};
        this._season = [];
        this._diameter = [];
        this._tyres_filter = [];
        this._product = {};
        this._totalCount = 0;
        this._vehicle_type = [];
        this._studded = [];
        this._speed_index = [];
        this._load_index = [];
        this._homologation = [];
        this._run_flat = [];
        this._reinforced = [];
        this._width = [];
        this._height = [];

        makeAutoObservable(this);
    }

    setTyres(tyres:[]) {
        this._tyres = tyres;
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
    setHeight(height: string[]) {
        this._height = height;
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
    setTyresFilter(tyres_filter: []) {
        this._tyres_filter = tyres_filter;
    }
    setProduct(product: {}) {
        this._product = product;
    }
    setTotalCount(totalCount: number) {
        this._totalCount = totalCount;
    }

    setVehicleType(vehicle_type: string[]) {
        this._vehicle_type = vehicle_type;
    }
    setStudded(studded: string[]) {
        this._studded = studded;
    }
    setSpeedIndex(speed_index: string[]) {
        this._speed_index = speed_index;
    }
    setLoadIndex(load_index: string[]) {
        this._load_index = load_index;
    }
    setHomologation(homologation: string[]) {
        this._homologation = homologation;
    }
    setRunFlat(run_flat: string[]) {
        this._run_flat = run_flat;
    }
    setReinforced(reinforced: string[]) {
        this._reinforced = reinforced;
    }
    setSeason(season: string[]) {
        this._season = season;
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
    get tyres_filter() {
        return this._tyres_filter;
    }
    get vehicle_type() {
        return this._vehicle_type;
    }
    get studded() {
        return this._studded;
    }
    get speed_index() {
        return this._speed_index;
    }
    get load_index() {
        return this._load_index;
    }
    get homologation() {
        return this._homologation;
    }
    get run_flat() {
        return this._run_flat;
    }
    get reinforced() {
        return this._reinforced;
    }
    get product() {
        return this._product;
    }
    get totalCount() {
        return this._totalCount;
    }
}