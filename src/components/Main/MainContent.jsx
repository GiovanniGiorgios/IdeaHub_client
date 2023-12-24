import React from "react";
import { observer } from "mobx-react-lite";

import styles from "./MainContent.module.css"
import ArticlesList from "../ArticlesList/ArticlesList";


const MainContent = observer(() => { // обертаєм елемент в observe() щоб відслідковувать змінні в реальному часі   

    return(
        <div className={styles.mainContent__wrapper} style={{position: 'relative', paddingBottom: '100px'}}>
            <div className={styles.mainContent__container}>
                <ArticlesList /> 
            </div>
        </div>
    );
});

export default MainContent;