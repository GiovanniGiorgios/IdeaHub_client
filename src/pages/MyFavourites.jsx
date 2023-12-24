import React, { useContext, useEffect, useState } from "react";
import { fetchFavoriteArticles } from "../services/FavoriteArticles";
import styles from "../components/ArticlesList/ArticlesList.module.css"
import BtnPageList from "../components/BtnPageList/BtnPageList";
import ArticleItem from "../components/ArticleItem/ArticleItem";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const MyFavourites = observer(() => {
    const {userStore} = useContext(Context)
    const [favoritesArticles, setFavoritesArticles] = useState([]);
    const [favoritesArticlesCount, setFavoritesArticlesCount] = useState();

    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 5; 

    const maxPages = Math.ceil(favoritesArticlesCount / itemsPerPage);

    useEffect(() => {
        fetchArticles(activePage, itemsPerPage, userStore.user.id)
    }, [])
    

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

        fetchArticles(page, itemsPerPage, userStore.user.id);
    };  

    const fetchArticles = async (activePage, itemsPerPage, userId) => {
        
        try {
            const response = await fetchFavoriteArticles(activePage, itemsPerPage, userId);
            setFavoritesArticles(response)
            setFavoritesArticlesCount(response.count)
        } catch (e) {
            console.log(e.response?.message);
        }
    }

    return (
        <>
            {favoritesArticles ? (
                favoritesArticles.map((article) => (
                    <ArticleItem key={article.id} article={article} />
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

export default MyFavourites;