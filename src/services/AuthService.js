import { $host, $authHost, $api } from "../http/index";

export const registration = async (email, password, nickName) => {
    // відповідь від сервера 
    // базовий url береться з .env
    // функція auth
    const {data} = await $host.post('api/user/registration', {email, password, role: "USER", nickName})

    return data
}
export const login = async (email, password) => {
    const {data} = await $api.post('api/user/login', {email, password})

    return data
}
// export const login = async (email, password) => {
//     const {data} = await $host.post('api/user/login', {email, password})

//     return data
// }
export const logout = async () => {
    const {data} = await $api.post('api/user/logout')

    return data
}
// export const check = async () => {
//     const {data} = await $authHost.get('api/user/auth')
//     localStorage.setItem('token', data.token) // помещаєм token в localStorage
//     return jwt_decode(data.token)
// } 

// по ідеї те саме що і check
// export const fetchUsers = async () => {
//     const {data} = await $authHost.get('api/user/getUsers')

//     return data
// }
