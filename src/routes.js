// всі маршрути до конктретних сторінок на сайті

import Admin from "./pages/Admin"
import MyFavourites from "./pages/MyFavourites"
import CreateArticle from "./pages/CreateArticle"
import Main from "./pages/Main"
import Auth from "./pages/Auth"
import ArticlePage from "./pages/ArticlePage"
import MyArticels from "./pages/MyArticles"
import MyAccount from "./pages/MyAccount"

import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE, MYFAVOURITES_ROUTE, ARTICLE_ROUTE, CREATE_ARTICLE, MYARTICLES, MYARTICLES_ROUTE, ACCOUNT_ROUTE } from "./utils/consts"

export const authRoutes = [ // маршрути до яких має доступ авторизований користувач
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: MYFAVOURITES_ROUTE,
        Component: MyFavourites
    },
]
export const publicRoutes = [ // бублічні маршрути
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: LOGIN_ROUTE,  
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: ARTICLE_ROUTE + '/:id',
        Component: ArticlePage
    },
    {
        path: CREATE_ARTICLE,
        Component: CreateArticle
    },
    {
        path: MYARTICLES_ROUTE,
        Component: MyArticels
    },
    {
        path: ACCOUNT_ROUTE,
        Component: MyAccount
    },
]