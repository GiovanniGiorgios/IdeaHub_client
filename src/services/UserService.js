import { $api } from "../http/index";

export const fetchUsers = async () => {
    const {data} = await $api.get('/user/getUsers')

    return data
}