import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import styles from "./MyAccountContent.module.css"
import { Context } from "../..";

const MyAccountContent = observer(() => {
    const {userStore} = useContext(Context);

    return (
        <div >
            MyAccount
            {JSON.stringify(userStore.user)}
        </div>
    );
});

export default MyAccountContent;