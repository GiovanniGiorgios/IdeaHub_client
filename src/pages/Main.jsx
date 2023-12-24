import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import MainContent from "../components/Main/MainContent";

const Main = observer(() => {

    return (
        <>
            <MainContent />
        </>
    );
});

export default Main;