// mobx - буде слідкувати за зміною цих змінних і при їх зміні компоненти будуть перерендуваться
import { makeAutoObservable } from "mobx";
import { fetchArticles, fetchArticlesCount, fetchMyArticles } from "../services/ArticleService"

export default class ArticleStore {
    constructor(){
        this._myArticles = []
        this._articles = []
        this._articlesCount = 0;
        this._isLoading = false

        makeAutoObservable(this)
    }

    // Ections - це функції, які якось змінюють состояниє
    setArticles(articles){
        this._articles = articles
    }
    setLoading(bool){
        this._isLoading = bool  
    }
    setMyArticles(articles){
        this._myArticles = articles
    }
    setArticlesCount(articlesCount){
        this._articlesCount = articlesCount
    }
    
    // get (викликається тількі тоді коли змінна яка була всередині зміниться)
    get articles(){
        return this._articles
    }
    get isLoading(){
        return this._isLoading
    }
    get myArticles(){
        return this._myArticles
    }
    get articlesCount(){
        return this._articlesCount
    }

    async fetchArticlesCount(){
        try {
            const response = await fetchArticlesCount();

            this.setArticlesCount(response.count)
        } catch (e) {
            console.log(e.response?.message);
        } 
    }

    async fetchMyArticles(activePage, itemsPerPage, userId){
        try {
            const response = await fetchMyArticles(activePage, itemsPerPage, userId);
            if(response.count)
                this.setArticlesCount(response.count)
        
            this.setMyArticles(response.articles)
        } catch (e) {
            console.log(e.response?.message);
        } finally{
            this.setLoading(false);
        }
    }

    async fetchArticles(activePage, itemsPerPage, userId){

        try {
            const response = await fetchArticles(activePage, itemsPerPage, userId);

            if(response.count)
                this.setArticlesCount(response.count)

            this.setArticles(response.articles)
        } catch (e) {
            console.log(e.response?.message);
        }
    }
}