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
      "CityName" : dataCity?.MainDescription,
      "CityRef" : dataCity?.DeliveryCity,
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
  
  const getCalcPriceNovaPoshta = async (
    citySender, 
    cityReceiver,
    goodsCost,
    goodsType,
    goodsQuantity,
    redeliveryCost
  ) =>
  await $novaPoshtaPost.post('/v2.0/json/',
  {
    "apiKey": process.env.REACT_APP_NOVA_POSHTA_API_KEY,
    "modelName": "InternetDocument",
    "calledMethod": "getDocumentPrice",
    "methodProperties": {
      "CitySender" : citySender,
      "CityRecipient" : cityReceiver,
      "Weight" : "0.1",
      "ServiceType" : "WarehouseWarehouse",
      "Cost" : goodsCost,
      "CargoType" : goodsType,
      "SeatsAmount" : goodsQuantity,
      "RedeliveryCalculate" : {
        "CargoType":"Money",
        "Amount":redeliveryCost
      },
      "PackCount" : "1",
      "PackRef" : "00000000-0000-0000-0000-000000000000",
      "Amount" : "100",
      "CargoDetails" : [
        {
        "CargoDescription":"00000000-0000-0000-0000-000000000000",
        "Amount":"2"
        },
      ],
      "CargoDescription" : "00000000-0000-0000-0000-000000000000"
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
