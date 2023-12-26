    // mobx - буде слідкувати за зміною цих змінних і при їх зміні компоненти будуть перерендуваться
    import { makeAutoObservable } from "mobx";
    import { registration, login, logout } from "../services/AuthService";
    import axios from "axios";
    import { $host} from "../http/index";

    export default class UserStore {
        constructor(){
            this._isAuth = false // _ означає що ця змінна не може мінятися
            this._isLoading = false
            this._user = {}

            
            makeAutoObservable(this)
        }

        // Ections - це функції, які якось змінюють состояниє
        setIsAuth(bool){
            this._isAuth = bool  
        }
        setLoading(bool){
            this._isLoading = bool  
        }
        setUser(user){
            this._user = user 
        }
        // get (викликається тількі тоді коли змінна яка була всередині зміниться)
        get isAuth(){
            return this._isAuth
        }
        get isLoading(){
            return this._isLoading
        }
        get user(){
            return this._user
        }

        async login(email, password){
            try {
                const response = await login(email, password);

                localStorage.setItem('token', response.accessToken);//щоб ми могли добавляти в кожному запросі
                this.setIsAuth(true);
                this.setUser(response.user);//
            } catch (e) {
                console.log(e.response?.message);
            } finally{
                console.log("LOGIN CHECK")
            }
        }
        async registration(email, password){
            try {
                const response = await registration(email, password);

                localStorage.setItem('token', response.accessToken);//щоб ми могли добавляти в кожному запросі
                this.setIsAuth(true);
                this.setUser(response.user);
            } catch (e) {
                console.log(e.response?.message);
            }
        }  

        async logout(){
            try {
                const response = await logout();
                
                this.setIsAuth(false);
                this.setUser({});
            } catch (e) {
                console.log(e.response?.message);
            }
        }

        async checkAuth(){

            this.setLoading(true);
            
            try {
                const response = await axios.get(process.env.REACT_APP_API_URL, {withCredentials: true});
                
                localStorage.setItem('token', response.accessToken);//щоб ми могли добавляти в кожному запросі
                this.setIsAuth(true);
                this.setUser(response.data.user);
            } catch (e) {
                console.log(e.response?.message);
            } finally{
                this.setLoading(false);
            }
        }
    }
