import { IDapertmentNP } from '../components/basket/types/DepartmentType.type';
import { WareHouseNPType } from './enum/typeWareHouseNP.enum';
import { $novaPoshtaPost } from './index';

const getCityNovaPoshta = async (dataCity: string) =>
  await $novaPoshtaPost.post('/v2.0/json/',
    {
        "apiKey": process.env.REACT_APP_NOVA_POSHTA_API_KEY,
        "modelName": "Address",
        "calledMethod": "searchSettlements",
        "methodProperties": {
            "CityName" : dataCity,
            "Limit" : "100",
            "Page" : "1"
        }
    }
    )
    .then((response) => response.data)
    .catch((error: any) => {
      console.log(`Не вірно вказані дані, або інша помилка.`, error);
    });

const getWareHousesNovaPoshta = async (dataCity: IDapertmentNP) =>
  await $novaPoshtaPost.post('/v2.0/json/',
  {
    "apiKey": process.env.REACT_APP_NOVA_POSHTA_API_KEY,
    "modelName": "Address",
    "calledMethod": "getWarehouses",
    "methodProperties": {
      "CityName" : dataCity.MainDescription,
      "CityRef" : dataCity.DeliveryCity,
      "Page" : "1",
      "Limit" : "200",
      "Language" : "UA",
      "TypeOfWarehouseRef" : WareHouseNPType.REF_VANTAGNE,
      "WarehouseId" : ""
    }
  }
    )
    .then((response) => response.data)
    .catch((error: any) => {
      console.log(`Не вірно вказані дані, або інша помилка.`, error);
    });

export { 
    getCityNovaPoshta,
    getWareHousesNovaPoshta
};
