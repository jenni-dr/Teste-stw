import axios from 'axios';

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
axios.defaults.headers.patch['Content-Type'] = 'application/json';
Api.interceptors.request.use(async config => {
    
    const token = localStorage.getItem('token') || "JWT";

    config.headers = config.headers ? config.headers : {};
    config.headers['Content-Type'] = 'application/json';

    if (token) {
        
        config.headers.Authorization = `Bearer ${token}`;
    }

    

    return config;
});

Api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    return Promise.reject(error?.response?.data);
});

export { Api };