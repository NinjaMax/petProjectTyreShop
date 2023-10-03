import { IDapertmentNP } from '../components/basket/types/DepartmentType.type';
import { WareHouseNPType } from './enum/typeWareHouseNP.enum';
import { $novaPoshtaPost } from './index';
import { CalcNovaPoshta } from './types/CalcNovaPoshta.type';

const getCityInRegionNovaPoshta = async (refRegionData: string, page: number) =>
  await $novaPoshtaPost.post('/v2.0/json/',
    {
      "apiKey":  process.env.REACT_APP_NOVA_POSHTA_API_KEY,
      "modelName": "Address",
      "calledMethod": "getSettlements",
      "methodProperties": {
   "AreaRef" : refRegionData,
   "Ref" : "",
   "RegionRef" : "",
   "Page" : page,
   "Warehouse" : "1",
   "FindByString" : "",
   "Limit" : "150"
      }
   }
    )
    .then((response) => response.data)
    .catch((error: any) => {
      console.log(`Не вірно вказані дані, або інша помилка.`, error);
    });


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
      "Limit" : "250",
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
  
  const getCalcPriceNovaPoshta = async (dataCalc: CalcNovaPoshta
    // citySender: string, 
    // cityReceiver: string,
    // goodsCost: string,
    // goodsType: string,
    // goodsQuantity: string,
    // redeliveryCost: string,
  ) =>
  await $novaPoshtaPost.post('/v2.0/json/',
  {
    "apiKey": process.env.REACT_APP_NOVA_POSHTA_API_KEY,
    "modelName": "InternetDocument",
    "calledMethod": "getDocumentPrice",
    "methodProperties": {
      "CitySender" : dataCalc.citySender,
      "CityRecipient" : dataCalc.cityReceiver,
      "Weight" : "0.1",
      "ServiceType" : "WarehouseWarehouse",
      "Cost" : dataCalc.goodsCost,
      "CargoType" : dataCalc.goodsType,
      "SeatsAmount" : dataCalc.goodsQuantity,
      "RedeliveryCalculate" : {
        "CargoType":"Money",
        "Amount": dataCalc.redeliveryCost,
      },
      "PackCount" : "1",
      "PackRef" : "",
      "Amount" : "1",
      "CargoDetails" : [
        {
        "CargoDescription": dataCalc.goodsDescription,
        "Amount": dataCalc.goodsQuantity
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
    getWareHousesNovaPoshta,
    getCalcPriceNovaPoshta,
    getCityInRegionNovaPoshta
};
