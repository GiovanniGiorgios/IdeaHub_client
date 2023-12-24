import { $host, $authHost, $api } from "../http/index";

export const addLike = async (articleId, userId) => {
    const {data} = await $host.post('api/rating/like/', {articleId, userId})

    return data
}
export const addDislike = async (articleId, userId) => {
    const {data} = await $host.post('api/rating/dislike/', {articleId, userId})

    return data
}