import {makeAutoObservable} from 'mobx';

export default class FilterStore {
    _width:string | undefined;
    _chipWidth: string[];
    _height:string;
    _brands: string;
    _chipBrands: string[];
    _models: string;
    _price:string;
    _chipPrice:string[];
    _diameter: string;
    _season: string;
    _chipSeason: string[];
    _vehicle_type: string;
    _chipVehicleType: string[];
    _studded:string;
    _chipStudded: string[];
    _speed_index:string;
    _chipSpeedIndex: string[];
    _load_index:string;
    _chipLoadIndex:string[];
    _homologation:string;
    _chipHomologation:string[];
    _run_flat:string;
    _chipRunFlat:string[];
    _reinforced:string;
    _chipReinforced:string[];
    _sort: string;
    _widthSearch: string[]| null;
    _heightSearch: string[]| null;
    _diameterSearch: string[]| null;
    _brandSearch: string[]| null;
    constructor() { 
        this._width = '';
        this._chipWidth = [];
        this._height = '';
        this._brands = '';
        this._chipBrands = [];
        this._models = '';
        this._price = '';
        this._chipPrice = ['0','0'];
        this._diameter = '';
        this._season = '';
        this._chipSeason =[];
        this._vehicle_type = '';
        this._chipVehicleType = [];
        this._studded = '';
        this._chipStudded = [];
        this._speed_index = '';
        this._chipSpeedIndex = [];
        this._load_index = '';
        this._chipLoadIndex = [];
        this._homologation = '';
        this._chipHomologation = [];
        this._run_flat = '';
        this._chipRunFlat = [];
        this._reinforced = '';
        this._chipReinforced = [];
        this._sort = 'ASC';
        this._widthSearch = [];
        this._heightSearch = [];
        this._diameterSearch = [];
        this._brandSearch = [];
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
    setPrice(prices: string) {
        this._price = prices;
    }
    setChipPrice(prices: []) {
        this._chipPrice = prices;
    }
    setDiameter(diameter: string) {
        this._diameter = diameter;
    }
    setSeason(season: string) {
        this._season = season;
    }
    setChipSeason(chipSeason: []) {
        this._chipSeason = chipSeason;
    }
    setVehicleType(vehicle_type: string) {
        this._vehicle_type = vehicle_type;
    }
    setChipVehicleType(chipVehicleType: []) {
        this._chipVehicleType = chipVehicleType;
    }
    setStudded(studded: string) {
        this._studded = studded;
    }
    setChipStudded(chipStudded: []) {
        this._chipStudded = chipStudded;
    }
    setSpeedIndex(speed_index: string) {
        this._speed_index = speed_index;
    }
    setChipSpeedIndex(chipSpeed_index: []) {
        this._chipSpeedIndex = chipSpeed_index;
    }
    setLoadIndex(load_index: string) {
        this._load_index = load_index;
    }
    setChipLoadIndex(chipLoad_index: []) {
        this._chipLoadIndex = chipLoad_index;
    }
    setHomologation(homologation: string) {
        this._homologation = homologation;
    }
    setChipHomologation(chiphomologation: []) {
        this._chipHomologation = chiphomologation;
    }
    setRunFlat(run_flat: string) {
        this._run_flat = run_flat;
    }
    setChipRunFlat(chipRun_flat: []) {
        this._chipRunFlat = chipRun_flat;
    }
    setReinforced(reinforced: string) {
        this._reinforced = reinforced;
    }
    setChipReinforced(chipreinforced: []) {
        this._chipReinforced = chipreinforced;
    }
    setSort(sort: string) {
        this._sort = sort;
    }
    setWidthSearch(widthSearch: []) {
        this._widthSearch = widthSearch;
    }
    setHeightSearch(heightSearch: []) {
        this._heightSearch = heightSearch;
    }
    setDiameterSearch(diameterSearch: []) {
        this._diameterSearch = diameterSearch;
    }
    setBrandSearch(brandSearch: []) {
        this._brandSearch = brandSearch;
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
    get price() {
        return this._price;
    }
    get chipPrice() {
        return this._chipPrice;
    }
    get season() {
        return this._season;
    }
    get chipSeason() {
        return this._chipSeason;
    }
    get vehicle_type() {
        return this._vehicle_type;
    }
    get chipVehicleType() {
        return this._chipVehicleType;
    }
    get studded() {
        return this._studded;
    }
    get chipStudded() {
        return this._chipStudded;
    }
    get speed_index() {
        return this._speed_index;
    }
    get chipSpeedIndex() {
        return this._chipSpeedIndex;
    }
    get load_index() {
        return this._load_index;
    }
    get chipLoadIndex() {
        return this._chipLoadIndex;
    }
    get homologation() {
        return this._homologation;
    }
    get chipHomologation() {
        return this._chipHomologation;
    }
    get run_flat() {
        return this._run_flat;
    }
    get chipRunFlat() {
        return this._chipRunFlat;
    }
    get reinforced() {
        return this._reinforced;
    }
    get chipReinforced() {
        return this._chipReinforced;
    }
    get sort() {
        return this._sort;
    }
    get widthSearch() {
        return this._widthSearch;
    }
    get heightSearch() {
        return this._heightSearch;
    }
    get diameterSearch() {
        return this._diameterSearch;
    }
    get brandSearch() {
        return this._brandSearch;
    }
    

    removeChipBrandsItem(indexNumber: number) {
        this._chipBrands.splice(indexNumber, 1);
    }
    removeChipSeasonItem(indexNumber: number) {
        this._chipSeason.splice(indexNumber, 1);
    }
    removeChipVehicleTypeItem(indexNumber: number) {
        this._chipVehicleType.splice(indexNumber, 1);
    }
    removeChipStuddedItem(indexNumber: number) {
        this._chipStudded.splice(indexNumber, 1);
    }
    removeChipSpeedIndexItem(indexNumber: number) {
        this._chipSpeedIndex.splice(indexNumber, 1);
    }
    removeChipLoadIndexItem(indexNumber: number) {
        this._chipLoadIndex.splice(indexNumber, 1);
    }
    removeChipHomologationItem(indexNumber: number) {
        this._chipHomologation.splice(indexNumber, 1);
    }
    removeChipRunFlatItem(indexNumber: number) {
        this._chipRunFlat.splice(indexNumber, 1);
    }
    removeChipReinforcedItem(indexNumber: number) {
        this._chipReinforced.splice(indexNumber, 1);
    }
    addFirstPrice(firstPrice: string) {
        this._chipPrice[0] = firstPrice;
    }
    addLastPrice(lastPrice: string) {
        this._chipPrice[1] = lastPrice;
    }

}