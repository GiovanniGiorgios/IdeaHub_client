// // логіка регістрації перевірки token

// import { $host, $authHost } from "./index";
// import jwt_decode from "jwt-decode";

// export const registration = async (email, password, nickName) => {
//     // відповідь від сервера 
//     // базовий url береться з .env
//     // функція auth
//     const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN', nickName})
//     //localStorage.setItem('token', data.token) // помещаєм token в localStorage
//     //return jwt_decode(data)

//     return data
// }
// export const login = async (email, password) => {
//     const {data} = await $host.post('api/user/login', {email, password})
//     // localStorage.setItem('token', data.token) // помещаєм token в localStorage
//     // return jwt_decode(data.token)
//     return data
// }
// export const check = async () => {
//     const {data} = await $authHost.get('api/user/auth')
//     localStorage.setItem('token', data.token) // помещаєм token в localStorage
//     return jwt_decode(data.token)
// }
