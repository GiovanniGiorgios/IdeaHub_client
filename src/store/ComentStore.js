// mobx - буде слідкувати за зміною цих змінних і при їх зміні компоненти будуть перерендуваться
import { makeAutoObservable } from "mobx";

export default class ComentStore {
    constructor(){
        this._coment = []

        makeAutoObservable(this)
    }

    // Ections - це функції, які якось змінюють состояниє
    setArticles(coments){
        this._coments = coments
    }

    // get (викликається тількі тоді коли змінна яка була всередині зміниться)
    get coments(){
        return this._articles
    }
}