import axios from 'axios';
//import { ConfigService } from 'src/config/config.service';

//type conf = ConfigService;

const $hostPost = axios.create({
  baseURL: 'https://sms-fly.ua/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    //'Access-Control-Allow-Origin': `${process.env.CORS}`,
  },
  //withCredentials: true,
})

export { $hostPost };
