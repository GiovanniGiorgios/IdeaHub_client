import { $host, $authHost } from "../http/index";

// ***** ARTICLECONTENT ***** //
export const createArticleContent = async (articleContent) => {
    const {data} = await $authHost.post('api/articleContent', articleContent)

    return data
}

// ***** ARTICLE ***** //
// Create Article
export const createArticle = async (article) => {
    const {data} = await $authHost.post('api/article', article)

    return data
}
// GET ARTICLE/:id
export const fetchOneArticle = async (id) => {
    const {data} = await $host.get('api/article/' + id)
    
    return data
}
// GET Articles
// export const fetchArticles = async (title, text, titleImg, activePage, itemsPerPage) => {
export const fetchArticles = async (activePage, itemsPerPage, userId) => {
    const {data} = await $host.get('api/article', {
        params: {
            activePage, 
            itemsPerPage, 
            userId
        }
    });

    return data;
}
// GET ARTICLECONTENT
// export const fetchArticleContent = async (id) => {
//     const {data} = await $host.get('api/articleContent/' + id)
    
//     return data
// }
// GET User's MyArticles (Articles created by the user)
export const fetchMyArticles = async (activePage, itemsPerPage, userId) => {
    const {data} = await $host.get('api/article/getMyArticles', {
        params: {
            activePage, 
            itemsPerPage, 
            userId
        }
    });
    
    return data;
}
// GET Articles Count
export const fetchArticlesCount = async () => {
    const {data} = await $host.get('api/article/articlesCount'); //{"count":14}

    return data;
}