import { $host, $authHost, $api } from "../http/index";

export const addFavoriteArticle = async (articleId, userId) => {
    const {data} = await $host.post('api/favouriteArticle/', {articleId, userId})

    return data
}
export const fetchFavoriteArticles = async (activePage, itemsPerPage, userId) => {
    const {data} = await $host.get('api/favouriteArticle/', {
        params: {
            activePage, 
            itemsPerPage, 
            userId
        }
    });

    return data
}
export const deleteFavoriteArticle = async (articleId, userId) => {
    const {data} = await $api.delete('api/favouriteArticle/' + articleId, {articleId, userId})

    return data
}