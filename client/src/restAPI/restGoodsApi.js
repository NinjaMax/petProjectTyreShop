
const axiosInstance = axios.create({
        baseURL: 'http://localhost:4000/tyres',
        //timeout: 1000,
        //headers: {'X-Custom-Header': 'foobar'},
        method: 'get'
      });