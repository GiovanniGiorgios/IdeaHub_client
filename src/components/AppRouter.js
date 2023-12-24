// логіка навігації по сторінкам

import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { MAIN_ROUTE } from "../utils/consts";
import { Context } from "..";

const AppRouter = () => {
    const {userStore} = useContext(Context)

    return (
        // вказуєм кількі маршрутів і якщо жоден з їх не відробив то відпрацює самий останій, який вказоний в цьому Switch
        <Routes> 
            {userStore.isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />} exact/> // exact - означає що путь повинен точно співпадати
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />} exact/> // exact - означає що путь повинен точно співпадати
            )}

            <Route
                path="*"
                element={<Navigate to={MAIN_ROUTE} replace />}
            />
        </Routes>
    );
};

export default AppRouter;