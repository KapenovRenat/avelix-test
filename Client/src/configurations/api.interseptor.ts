import axios from 'axios'
import { config } from './index';

axios.defaults.baseURL = config.url;
export default axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('Token');
    if (token){
        config.headers['Authorization'] = 'Token ' + token;
        return config;
    } else {
        return config;
    }
}, function (error) {
    return Promise.reject(error);
});
