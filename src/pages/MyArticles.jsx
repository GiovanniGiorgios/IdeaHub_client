import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";

import ArticleItem from "../components/ArticleItem/ArticleItem";
import BtnPageList from "../components/BtnPageList/BtnPageList";
import { observer } from "mobx-react-lite";

import styles from "../components/ArticlesList/ArticlesList.module.css"
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";


const MyArticles = observer(() => {
    // зробити цю сторінку просто як інформ-сторінку про мої статті, заходиш даже
    // якщо немає статтей то просто писать створити статтю і інформацію 
    // відносто статтей: кількість, топ, короче зробити сортировку, статистику
    const { articleStore } = useContext(Context);
    const { userStore } = useContext(Context);
    const navigate = useNavigate();

    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 5; 
    
    const maxPages = Math.ceil(articleStore.articlesCount / itemsPerPage);

    const [infoText, setInfoText] = useState("");

    useEffect(() => {
        if (!userStore.isAuth || !userStore.user) {
            setInfoText("Увійдіть в акаунт")
            navigate(LOGIN_ROUTE);
        } else{
            articleStore.fetchMyArticles(activePage, itemsPerPage, userStore.user.id)
            if(!articleStore.myArticles){
                setInfoText("Створити статтю")
            }
        }

    }, [userStore, articleStore])

    const nextPage = () => {
        let newPage = activePage + 1;

        if(newPage <= maxPages){
            fetchArticlesAndSetPage(newPage);
        }
    }
    const prevPage = () => {
        let newPage = activePage - 1;

        if(newPage !== 0){
            fetchArticlesAndSetPage(newPage)
        }
    }

    const fetchArticlesAndSetPage = async (page) => {
        setActivePage(page);
        articleStore.fetchMyArticles(page, itemsPerPage, userStore.user.id);
    };


    // WHAT DATA
    const whatData = (responceData) => {
        const dateObject = new Date(responceData);

        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1; // Місяці в JavaScript починаються з 0, тому додаємо 1
        const day = dateObject.getDate();
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes();
        const seconds = dateObject.getSeconds();

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
   
    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center' , width: "100%"}}>
                {infoText}
            </div>

            {articleStore.myArticles ? (
                articleStore.myArticles.map((article) => (
                    <div key={article.id} style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>

                        <div style={{flex: '50%'}}>
                            <ArticleItem key={article.id} article={article} />
                        </div>

                        <div style={{flex: '50%', padding: '20px'}}>
                            <h1 style={{fontSize: "24px"}}>Дані про статтю:</h1>

                            <p>Рейтинг: {article.rating}</p>
                            <p>Дата створення: {whatData(article.createdAt)}</p>
                            <p>...В розробці...</p>

                            <button></button>                            
                        </div>
                    </div>


                ))
            ) : (
                <p>Loading...</p>
            )}

            <div id="Pagination" className={styles.pagination}>
                <div className={styles.pagination_main}>
                    <button className={`${styles.prev} ${styles.paginationBtn}`}  onClick={prevPage}>Back</button>

                   <BtnPageList activePage={activePage} pageCount={maxPages} changePageFunc={(page) => fetchArticlesAndSetPage(page)} />

                    <button className={styles.next + " " + styles.paginationBtn} onClick={nextPage}>Next</button>
                </div>
            </div>
        </>
    );
});

export default MyArticles;