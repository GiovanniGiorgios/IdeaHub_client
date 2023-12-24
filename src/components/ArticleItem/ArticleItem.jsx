import React, { useContext, useState } from "react";

import styles from "./ArticleItem.module.css"
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import { ARTICLE_ROUTE } from "../../utils/consts";

import { IconHeart, IconLike, IconDislike } from "../../utils/Icons";
// QUILL styles
import 'react-quill/dist/quill.snow.css';
import { useEffect } from "react";
import { addFavoriteArticle } from "../../services/FavoriteArticles";
import { Context } from "../..";
import { addLike, addDislike } from "../../services/ArticleRatingSertive";

const ArticleItem = ({article}) => { // обертаєм елемент в observe() щоб відслідковувать змінні в реальному часі   
    const navigate = useNavigate();
    const {userStore} = useContext(Context);

    const [updatedContent, setUpdatedContent] = useState(article.content);
    
    const [heartIsFill, setHeartFill] = useState(Boolean);
    const [likeIsFill, setLikeFill] = useState(Boolean);
    const [dislikeIsFill, setDislikeFill] = useState(Boolean);

    useEffect(() => {  
        setHeartFill(article.userFavouriteArticle == true ? true : false)
        setLikeFill(article.userRating == 1 ? true : false)
        setDislikeFill(article.userRating == -1 ? true : false)
        
        // добавляє до content(до картинок) process.env.REACT_APP_API_URL + '/'
        let tempElement = document.createElement('div');
        tempElement.innerHTML = article.content;
        
        let imgElements = tempElement.querySelectorAll('img');
  
        imgElements.forEach(imgElement => {
            let currentSrc = imgElement.getAttribute('src');
            if (currentSrc) {
                imgElement.setAttribute('src', process.env.REACT_APP_API_URL + '/' + currentSrc);
            }
        });
  
      setUpdatedContent(tempElement.innerHTML);
  
    }, [article])

    const PlusToFavourite = () => {
        
        addFavoriteArticle(article.id, userStore.user.id)
    }

    const LikeOrDisArticle = async(likeOrDis) => {
        if(likeOrDis == "LIKE"){
            try {
                if(dislikeIsFill){
                    setDislikeFill(!dislikeIsFill)
                }
                const response = await addLike(article.id, userStore.user.id);
            } catch (e) {
                console.log(e.response?.message);
            }   
        }else{
            try {
                if(likeIsFill){
                    setLikeFill(!likeIsFill)
                }
                const response = await addDislike(article.id, userStore.user.id);
            } catch (e) {
                console.log(e.response?.message);
            }          
        }
    }

    return(
        <div className={styles.mainContent__wrapper} style={{background:'white'}}>
            <div className={styles.mainContent__container}>
               <div className={styles.article}>
                    <div className={styles.article__wrapper}>

                        <div className="ql-snow">
                            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: updatedContent }} />
                        </div>

                        <div className={styles.article__footer}>
                            <button onClick={() => navigate(ARTICLE_ROUTE + '/' + article.id)} className={styles.article__btn}>
                                Read
                            </button>
                
                            <div className={styles.article__icons}>
                                <div className={styles.icon__wrapper}>
                                    <p>In favourites: {article.inFavouritesCount}</p>
                                </div>
                                <div className={styles.icon__wrapper}>
                                    <p>Views: {article.rating}</p>
                                </div>
                                <div className={styles.icon__wrapper}>
                                    <p>Rating: {article.rating}</p>
                                </div>
                                <div className={styles.icon__wrapper}>
                                    <IconHeart 
                                        width="25px" 
                                        height="25px" 
                                        fill={heartIsFill ? 'red' : 'currentColor'}
                                        className={styles.icon} 
                                        onClick={() => (
                                            PlusToFavourite(),
                                            setHeartFill(prev => !prev)
                                        )}                                    
                                    />
                                </div>
                                <div className={styles.icon__wrapper}>
                                    <IconDislike 
                                        width="25px" 
                                        height="25px" 
                                        fill={dislikeIsFill ? 'red' : 'currentColor'}
                                        className={styles.icon} 
                                        onClick={() => (
                                            LikeOrDisArticle("DIS"),
                                            setDislikeFill(prev => !prev)

                                        )}
                                    />
                                </div>
                                <div className={styles.icon__wrapper}>
                                    <IconLike 
                                        width="25px" 
                                        height="25px" 
                                        fill={likeIsFill ? 'green' : 'currentColor'}
                                        className={styles.icon} 
                                        onClick={() => (
                                            LikeOrDisArticle("LIKE"),
                                            setLikeFill(prev => !prev)
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        </div>
    );
};

export default ArticleItem;