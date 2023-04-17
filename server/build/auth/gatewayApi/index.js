import axios from 'axios';
const $hostPost = axios.create({
    baseURL: 'https://sms-fly.ua',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
});
export { $hostPost };
