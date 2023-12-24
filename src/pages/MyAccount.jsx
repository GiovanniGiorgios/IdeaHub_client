import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import MyAccountContent from "../components/MyAccountContent/MyAccountContent";
import { useNavigate } from "react-router-dom";
import { Context } from "..";
import { ACCOUNT_ROUTE, LOGIN_ROUTE } from "../utils/consts";

const MyAccount = observer(() => {
    const {userStore} = useContext(Context);
    const navigate = useNavigate();

    // //CHECK AUTH OR ACCOUNT PAGE
    useEffect(() => {
        if (!userStore.isAuth || !userStore.user) {
            navigate(LOGIN_ROUTE);
        }
    }, [userStore.isAuth, userStore.user]);

    return (
        <>
        
            {/* {userStore.isAuth && <MyAccountContent />} */}

            <MyAccountContent />
        </>
    );

});

export default MyAccount;