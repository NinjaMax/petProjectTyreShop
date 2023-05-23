import { ActionGoodsType } from "../enums/ActionGoods";

export type ActionGoodsReducer = 
| { type: ActionGoodsType.SORT_BY_BRAND, sortBrand: any}
| { type: ActionGoodsType.SORT_BY_CATEGORY, sortCategory: any}
| { type: ActionGoodsType.SORT_BY_CODE, sortCode: any}
| { type: ActionGoodsType.SORT_BY_SEASON, sortSeason: any}
| { type: ActionGoodsType.SORT_BY_COUNTRY, sortCountry: any}
| { type: ActionGoodsType.SORT_BY_YEAR, sortYear: any};