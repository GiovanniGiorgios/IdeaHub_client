import axios from "axios"; // для виконання http запросов з браузера або з node.js

const $api = axios.create({
    withCredentials: true, // щоб автоматично добавлялись куки 
    baseURL: process.env.REACT_APP_API_URL
})
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})
//якщо прийшов 401 запрос
$api.interceptors.request.use((config) => {
    return config
}, async (error) => {
    const originalRequest = error.config;

    if(error.response.status === 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true;
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL, {withCredentials: true});
            // const response = await axios.get('http://localhost:9000/api/user/refresh', {withCredentials: true});
            localStorage.setItem('token', response.accessToken);

            return $api.request(originalRequest);
        } catch (error) {
            console.log("КОРИСТУВАЧ НЕ АВТОРИЗОВАНИЙ")
        }
    }
    throw error; // пробросить помилку на верхній уровень
})

// для обичних запросов яким не треба авторизаціх
const $host = axios.create({
    withCredentials: true, // щоб автоматично добавлялись куки 
    baseURL: process.env.REACT_APP_API_URL
})

// автоматично буде підставляться header autorization і туди буде добавляться токен
const $authHost = axios.create({
    withCredentials: true, // щоб автоматично добавлялись куки 
    baseURL: process.env.REACT_APP_API_URL
})

// параметром приймає config щоб витягнути token
// при авторизації token помещається в localStorage
const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

// буде отрабатавать при кожному запросе і підставляти token
$authHost.interceptors.request.use(authInterceptor)

export{
    $api,
    $host,
    $authHost,
}