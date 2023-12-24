    import { observer } from "mobx-react-lite";
    import React, { useContext, useEffect, useState } from "react";
    import { Context } from "../..";
    import ArticleItem from "../ArticleItem/ArticleItem";
    import styles from "./ArticlesList.module.css"
    import BtnPageList from "../BtnPageList/BtnPageList";


    const ArticlesList = observer(() => {
        const { articleStore } = useContext(Context);
        const { userStore } = useContext(Context);

        const [activePage, setActivePage] = useState(1);
        const itemsPerPage = 5; 

        const maxPages = Math.ceil(articleStore.articlesCount / itemsPerPage);

        useEffect(() => {
            articleStore.fetchArticles(activePage, itemsPerPage, userStore.user.id);
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
            articleStore.fetchArticles(page, itemsPerPage);
        };

        return (
            <>
                {articleStore.articles ? (
                    articleStore.articles.map((article) => (
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

    export default ArticlesList;