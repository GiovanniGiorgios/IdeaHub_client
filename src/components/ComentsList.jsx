import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import ArticleItem from "./ArticleItem/ArticleItem";


const ArticlesList = () => {
    const {coment} = useContext(Context)

    return (
        <>
            {article.articles.map(article => 
                <ArticleItem key={article.id} article={article} />
            )}


        </>
    );
};

export default ArticlesList;