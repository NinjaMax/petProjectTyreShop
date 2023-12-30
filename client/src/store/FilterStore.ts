import {makeAutoObservable} from 'mobx';

export default class FilterStore {
    _filterCount: number;
    _width:string | undefined;
    _width_id:string;
    _chipWidth: string[];
    _height:string;
    _height_id:string;
    _chipHeight: string[];
    _brands: string;
    _brands_id: string;
    _chipBrands: string[];
    _models: string;
    _price:string;
    _chipPrice:string[];
    _diameter: string;
    _diameter_id: string;
    _chipDiameter: string[];
    _season: string;
    _season_id: string;
    _chipSeason: string[];
    _vehicle_type: string;
    _vehicle_type_id: string;
    _chipVehicleType: string[];
    _studded:string;
    _studded_id:string;
    _chipStudded: string[];
    _speed_index:string;
    _speed_index_id:string;
    _chipSpeedIndex: string[];
    _load_index:string;
    _load_index_id:string;
    _chipLoadIndex:string[];
    _homologation:string;
    _homologation_id:string;
    _chipHomologation:string[];
    _run_flat:string;
    _run_flat_id:string;
    _chipRunFlat:string[];
    _reinforced:string;
    _reinforced_id:string;
    _chipReinforced:string[];
    _bolt_count: string;
    _chipBoltCount:string[];
    _type: string;
    _chipType: string[];
    _bolt_count_pcd:string;
    _chipBoltCountPcd: string[];
    _color:string;
    _chipColor: string[];
    _dia:string;
    _chipDia: string[];
    _et: string;
    _chipEt: string[];
    _pcd: string;
    _chipPcd: string[];
    _pcd2: string;
    _chipPcd2: string[];
    _sort: string;
    _tyres:[];
    _wheels:[];
    _oils:[];
    _batteries:[];
    _widthSearch: string[]| null;
    _heightSearch: string[]| null;
    _diameterSearch: string[]| null;
    _brandSearch: string[]| null;
    constructor() { 
        this._filterCount = 0;
        this._width = '';
        this._width_id = '';
        this._chipWidth = [];
        this._height = '';
        this._height_id = '';
        this._chipHeight = [];
        this._brands = '';
        this._brands_id = '';
        this._chipBrands = [];
        this._models = '';
        this._price = '';
        this._chipPrice = ['0','0'];
        this._diameter = '';
        this._diameter_id = '';
        this._chipDiameter = [];
        this._season = '';
        this._season_id = '';
        this._chipSeason =[];
        this._vehicle_type = '';
        this._vehicle_type_id = '';
        this._chipVehicleType = [];
        this._studded = '';
        this._studded_id = '';
        this._chipStudded = [];
        this._speed_index = '';
        this._speed_index_id = '';
        this._chipSpeedIndex = [];
        this._load_index = '';
        this._load_index_id = '';
        this._chipLoadIndex = [];
        this._homologation = '';
        this._homologation_id = '';
        this._chipHomologation = [];
        this._run_flat = '';
        this._run_flat_id = '';
        this._chipRunFlat = [];
        this._reinforced = '';
        this._reinforced_id = '';
        this._chipReinforced = [];
        this._bolt_count = '';
        this._chipBoltCount = [];
        this._type = '';
        this._chipType = [];
        this._bolt_count_pcd = '';
        this._chipBoltCountPcd = [];
        this._color = '';
        this._chipColor = [];
        this._dia = '';
        this._chipDia = [];
        this._et = '';
        this._chipEt = [];
        this._pcd = '';
        this._chipPcd = [];
        this._pcd2 = '';
        this._chipPcd2 = [];
        this._sort = 'ASC';
        this._widthSearch = [];
        this._heightSearch = [];
        this._diameterSearch = [];
        this._brandSearch = [];
        this._tyres = [];
        this._wheels = [];
        this._oils = [];
        this._batteries = [];
        makeAutoObservable(this);
    }
    setFilterCount(filterBtn: number) {
        this._filterCount = filterBtn;
    }
    setWidth(width: string) {
        this._width = width;
    }
    setWidth_id(width_id: string) {
        this._width_id = width_id;
    }
    setChipWidth(chipWidth: []) {
        this._chipWidth = chipWidth;
    }
    setHeight(height: string) {
        this._height = height;
    }
    setHeight_id(height_id: string) {
        this._height_id = height_id;
    }
    setChipHeight(chipHeight: []) {
        this._chipHeight = chipHeight;
    }
    setBrands(brands: string) {
        this._brands = brands;
    }
    setBrands_id(brands_id: string) {
        this._brands_id = brands_id;
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
    setDiameter_id(diameter_id: string) {
        this._diameter_id = diameter_id;
    }
    setChipDiameter(diameter: []) {
        this._chipDiameter = diameter;
    }
    setSeason(season: string) {
        this._season = season;
    }
    setSeason_id(season_id: string) {
        this._season_id = season_id;
    }
    setChipSeason(chipSeason: []) {
        this._chipSeason = chipSeason;
    }
    setVehicleType(vehicle_type: string) {
        this._vehicle_type = vehicle_type;
    }
    setVehicleType_id(vehicle_type_id: string) {
        this._vehicle_type_id = vehicle_type_id;
    }
    setChipVehicleType(chipVehicleType: []) {
        this._chipVehicleType = chipVehicleType;
    }
    setStudded(studded: string) {
        this._studded = studded;
    }
    setStudded_id(studded_id: string) {
        this._studded_id = studded_id;
    }
    setChipStudded(chipStudded: []) {
        this._chipStudded = chipStudded;
    }
    setSpeedIndex(speed_index: string) {
        this._speed_index = speed_index;
    }
    setSpeedIndex_id(speed_index_id: string) {
        this._speed_index_id = speed_index_id;
    }
    setChipSpeedIndex(chipSpeed_index: []) {
        this._chipSpeedIndex = chipSpeed_index;
    }
    setLoadIndex(load_index: string) {
        this._load_index = load_index;
    }
    setLoadIndex_id(load_index_id: string) {
        this._load_index_id = load_index_id;
    }
    setChipLoadIndex(chipLoad_index: []) {
        this._chipLoadIndex = chipLoad_index;
    }
    setHomologation(homologation: string) {
        this._homologation = homologation;
    }
    setHomologation_id(homologation_id: string) {
        this._homologation_id = homologation_id;
    }
    setChipHomologation(chiphomologation: []) {
        this._chipHomologation = chiphomologation;
    }
    setRunFlat(run_flat: string) {
        this._run_flat = run_flat;
    }
    setRunFlat_id(run_flat_id: string) {
        this._run_flat_id = run_flat_id;
    }
    setChipRunFlat(chipRun_flat: []) {
        this._chipRunFlat = chipRun_flat;
    }
    setReinforced(reinforced: string) {
        this._reinforced = reinforced;
    }
    setReinforced_id(reinforced_id: string) {
        this._reinforced = reinforced_id;
    }
    setChipReinforced(chipreinforced: []) {
        this._chipReinforced = chipreinforced;
    }
    setBoltCount(boltCount: string) {
        this._bolt_count = boltCount;
    };
    setChipBoltCount(chipBoltCount:[]) {
        this._chipBoltCount = chipBoltCount;
    };
    setType(type: string) {
        this._type = type;
    };
    setChipType(chipType: []) {
        this._chipType = chipType;
    };
    setBoltCountPcd(boltCountPcd: string) {
        this._bolt_count_pcd = boltCountPcd;
    };
    setChipBoltCountPcd (chipBoltCountPcd: []) {
        this._chipBoltCountPcd = chipBoltCountPcd;
    };
    setColor (color: string) {
        this._color = color;
    };
    setChipColor (chipColor: []) {
        this._chipColor = chipColor;
    };
    setDia (dia: string) {
        this._dia = dia;
    };
    setChipDia (chipDia: []) {
        this._chipDia = chipDia;
    };
    setEt (et: string) {
        this._et = et;
    };
    setChipEt (chipEt: []) {
        this._chipEt = chipEt;
    };
    setPcd (pcd: string) {
        this._pcd = pcd;
    };
    setChipPcd (chipPcd: []) {
        this._chipPcd = chipPcd;
    };
    setPcd2 (pcd2: string) {
        this._pcd2 = pcd2;
    };
    setChipPcd2 (chipPcd2: []) {
        this._chipPcd2 = chipPcd2;
    };
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
    setTyres(tyres: []) {
        this._tyres = tyres;
    }
    setWheels(wheels: []) {
        this._wheels = wheels;
    }
    setOils(oils: []) {
        this._oils = oils;
    }
    setBatteries(batteries: []) {
        this._batteries = batteries;
    }
    get filterCount() {
        return this._filterCount;
    }
    get width() {
        return this._width;
    }
    get width_id() {
        return this._width_id;
    }
    get chipWidth() {
        return this._chipWidth;
    }
    get height() {
        return this._height;
    }
    get chipHeight() {
        return this._chipHeight;
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
    get chipDiameter() {
        return this._chipDiameter;
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
    get bolt_count() {
        return this._bolt_count;
    };
    get chipBoltCount() {
        return this._chipBoltCount;
    };
    get type() {
        return this._type;
    };
    get chipType() {
        return this._chipType;
    };
    get bolt_count_pcd() {
        return this._bolt_count_pcd;
    };
    get chipBoltCountPcd() {
        return this._chipBoltCountPcd;
    };
    get color() {
        return this._color;
    };
    get chipColor() {
        return this._chipColor;
    };
    get dia() {
        return this._dia;
    };
    get chipDia() {
        return this._chipDia;
    };
    get et() {
        return this._et;
    };
    get chipEt() {
        return this._chipEt;
    };
    get pcd() {
        return this._pcd;
    };
    get chipPcd() {
        return this._chipPcd;
    };
    get pcd2() {
        return this._pcd2;
    };
    get chipPcd2() {
        return this._chipPcd2;
    };
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
    get tyres() {
        return this._tyres;
    }
    get wheels() {
        return this._wheels;
    }
    get oils() {
        return this._oils;
    }
    get batteries() {
        return this._batteries;
    }
    
    removeChipWidthItem() {
        this._chipWidth.splice(0, 1);
    }
    removeChipHeightItem() {
        this._chipHeight.splice(0, 1);
    }
    removeChipDiameterItem() {
        this._chipDiameter.splice(0, 1);
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
    removeChipBoltCountdItem(indexNumber: number) {
        this._chipBoltCount.splice(indexNumber, 1);
    }
    removeChipBoltCountPcdItem(indexNumber: number) {
        this._chipBoltCountPcd.splice(indexNumber, 1);
    }
    removeChipTypeItem(indexNumber: number) {
        this._chipType.splice(indexNumber, 1);
    }
    removeChipColorItem(indexNumber: number) {
        this._chipColor.splice(indexNumber, 1);
    }
    removeChipDiaItem(indexNumber: number) {
        this._chipDia.splice(indexNumber, 1);
    }
    removeChipEtItem(indexNumber: number) {
        this._chipEt.splice(indexNumber, 1);
    }
    removeChipPcdItem(indexNumber: number) {
        this._chipPcd.splice(indexNumber, 1);
    }
    removeChipPcd2Item(indexNumber: number) {
        this._chipPcd2.splice(indexNumber, 1);
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