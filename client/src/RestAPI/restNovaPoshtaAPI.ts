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
      console.log(`Не вірно вказані дані ${process.env.REACT_APP_NOVA_POSHTA_API}, або інша помилка.`, error);
    });

export { 
    getCityNovaPoshta 
};
