import CustomersStore from "../CustomersStore";
import FilterStore from "../FilterStore";
import GoodsBatteryStore from "../GoodsBatteryStore";
import GoodsOilStore from "../GoodsOilStore";
import GoodsTyreStore from "../GoodsTyreStore";
import GoodsWheelStore from "../GoodsWheelStore";
import LanguageStore from "../LangStore";
import PageStore from "../PageStore";
import UserStore from "../UserStore";

export interface StoreData  {
  user: UserStore, 
  customer: CustomersStore,
  isAuth: boolean,
  isLoading: boolean,
  goodsTyre: GoodsTyreStore,
  goodsWheel: GoodsWheelStore,
  goodsOil: GoodsOilStore,
  goodsBattery: GoodsBatteryStore,
  page: PageStore
  filter: FilterStore,
  lang: LanguageStore,
};