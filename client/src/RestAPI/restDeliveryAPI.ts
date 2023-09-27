import { $deliveryPost } from './index';
import { CalcDelivery } from './types/CalcDelivery.type';

const getCityDelivery = async (dataCity: string) =>
  await $deliveryPost.get(`/GetAreasList?culture=uk-UA&fl_all=fl_all&regionId=null&country=1&cityName=${dataCity}`,
    )
    .then((response) => response.data)
    .catch((error: any) => {
      console.log(`Не вірно вказані дані, або інша помилка.`, error);
    });

const getWareHousesDelivery = async (dataCityId: string) =>
  await $deliveryPost.get(`/GetWarehousesListByCity?CityId=${dataCityId}&DirectionType=1&culture=uk-UA`,
    )
    .then((response) => response.data)
    .catch((error: any) => {
      console.log(`Не вірно вказані дані, або інша помилка.`, error);
    });
  
  const getCalcPriceDelivery = async (dataCalc: CalcDelivery
  ) =>
  await $deliveryPost.post('/PostReceiptCalculate',
  {
    culture: "uk-Ua", //Культура
    areasSendId: dataCalc.citySender, //Місто відправлення
    areasResiveId: dataCalc.cityReceiver, //Місто прибуття
    warehouseSendId: dataCalc.warehouseSender, //Склад відправлення
    warehouseResiveId: dataCalc.warehouseReceiver, //Склад прибуття
    InsuranceValue: dataCalc.goodsCost, //Страхова вартість вантажу
    CashOnDeliveryValue: 0, //Вартість післяплати
    dateSend: "", //Дата відправлення
    deliveryScheme: 0, //Схема доставки
    category: [ //Масив категорій вантажу
    {
     categoryId: dataCalc.goodsType, //Id категорії вантажу
     countPlace: dataCalc.goodsQuantity, //Кількість місць
     helf: 0, //Вага вантажу
     size: 0 // Об’єм вантажу
    }],
     dopUslugaClassificator: [
    {
     dopUsluga: [ //Масив дод. послуг
     {
      uslugaId: "2b4247c9-be8c-e211-be60-00155d037919", //Id Дод. послуги
      count: 0 //Кількість дод. послуг
     },
     {
      uslugaId: "3e9cde5d-bf8c-e211-be60-00155d037919",
      count: 0
     }]
    }]
    }
    )
    .then((response) => response.data)
    .catch((error: any) => {
      console.log(`Не вірно вказані дані, або інша помилка.`, error);
    });

export { 
    getCityDelivery,
    getWareHousesDelivery,
    getCalcPriceDelivery
};
