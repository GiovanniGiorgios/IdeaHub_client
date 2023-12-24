// // mobx - буде слідкувати за зміною цих змінних і при їх зміні компоненти будуть перерендуваться
// import { makeAutoObservable } from "mobx";

// export default class DeviceStore {
//     constructor(){
//         // this._articles = [
//         //     {id: 1, title: "First", titleImg: `0780b55d-295e-4e4f-925f-ebdc0c72f0a1.jpg`, rating: 5, userFavouriteId: null,userId: null},
//         //     {id: 2, title: "Second", titleImg: `0780b55d-295e-4e4f-925f-ebdc0c72f0a1.jpg`, rating: 4, userFavouriteId: null,userId: null},
//         //     {id: 3, title: "Third", titleImg: `0780b55d-295e-4e4f-925f-ebdc0c72f0a1.jpg`, rating: 3, userFavouriteId: null,userId: null},
//         //     {id: 4, title: "Fourth", titleImg: `0780b55d-295e-4e4f-925f-ebdc0c72f0a1.jpg`, rating: 2, userFavouriteId: null,userId: null},
//         //     {id: 5, title: "Fifth", titleImg: `0780b55d-295e-4e4f-925f-ebdc0c72f0a1.jpg`, rating: 1, userFavouriteId: null,userId: null}
//         // ]


//         this._types = [] 
//         this._brands = []
//         this._devices = []
//         this._selectedType = {} // який type вибраний 
//         this._selectedBrand = {} // який brand вибраний 

//         makeAutoObservable(this)
//     }

//     // Ections - це функції, які якось змінюють состояниє

//     setArticles(articles){
//         this._articles = articles
//     }


//     setTypes(types){
//         this._types = types 
//     }
//     setBrands(brands){
//         this._brands = brands 
//     }
//     setDevices(devices){
//         this._devices = devices 
//     }
//     setSelectedType(selectedType){
//         this._selectedType = selectedType
//     }
//     setSelectedBrand(selectedBrand){
//         this._selectedBrand = selectedBrand
//     }
//     // get (викликається тількі тоді коли змінна яка була всередині зміниться)
//     get articles(){
//         return this._articles
//     }



//     get types(){
//         return this._types
//     }
//     get brands(){
//         return this._brands
//     }
//     get devices(){
//         return this._devices
//     }
//     get selectedType(){
//         return this._selectedType
//     }
//     get selectedBrand(){
//         return this._selectedBrand
//     }
// }