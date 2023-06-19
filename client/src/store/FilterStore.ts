import {makeAutoObservable} from 'mobx';

export default class FilterStore {
    _width:string | undefined;
    _chipWidth: string[];
    _height:string;
    _brands: string;
    _chipBrands: string[];
    _models: string;
    _diameter: string;
    _season: string;
    _vehicle_type: string;
    _studded:string;
    _speed_index:string;
    _load_index:string;
    _homologation:string;
    _run_flat:string;
    _reinforced:string;
    constructor() { 
        this._width = '';
        this._chipWidth = [];
        this._height = '';
        this._brands = '';
        this._chipBrands = [];
        this._models = '';
        this._diameter = '';
        this._season = '';
        this._vehicle_type = '';
        this._studded = '';
        this._speed_index = '';
        this._load_index = '';
        this._homologation = '';
        this._run_flat = '';
        this._reinforced = '';
        makeAutoObservable(this);
    }

    setWidth(width: string) {
        this._width = width;
    }
    setChipWidth(chipWidth: []) {
        this._chipWidth = chipWidth;
    }
    setHeight(height: string) {
        this._height = height;
    }
    setBrands(brands: string) {
        this._brands = brands;
    }
    setChipBrands(chipBrands: []) {
        this._chipBrands = chipBrands;
    }
    setModels(models: string) {
        this._models = models;
    }
    setDiameter(diameter: string) {
        this._diameter = diameter;
    }
    setSeason(season: string) {
        this._season = season;
    }
    setVehicleType(vehicle_type: string) {
        this._vehicle_type = vehicle_type;
    }
    setStudded(studded: string) {
        this._studded = studded;
    }
    setSpeedIndex(speed_index: string) {
        this._speed_index = speed_index;
    }
    setLoadIndex(load_index: string) {
        this._load_index = load_index;
    }
    setHomologation(homologation: string) {
        this._homologation = homologation;
    }
    setRunFlat(run_flat: string) {
        this._run_flat = run_flat;
    }
    setReinforced(reinforced: string) {
        this._reinforced = reinforced;
    }

    get width() {
        return this._width;
    }
    get chipWidth() {
        return this._chipWidth;
    }
    get height() {
        return this._height;
    }
    get brands() {
        return this._brands;
    }
    get chipBrands() {
        return this._chipBrands;
    }
    get diameter() {
        return this._diameter;
    }
    get models() {
        return this._models;
    }
    get season() {
        return this._season;
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

    removeChipBrandsItem(indexNumber: number) {
        this._chipBrands.splice(indexNumber, 1);
    }
}