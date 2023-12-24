import React, { useContext } from "react";

import { observer } from "mobx-react-lite";
import { REGISTRATION_ROUTE, MYFAVOURITES_ROUTE, MAIN_ROUTE, CREATE_ARTICLE, LOGIN_ROUTE, MYARTICLES_ROUTE, ACCOUNT_ROUTE} from "../../utils/consts";
import styles from "./NavBarLeft.module.css"
import houseSvg from '../../components/img/navBarLeft/house.svg'
import { Link } from "react-router-dom";
import { Context } from "../..";

const NavBarLeft = observer(() => { // обертаєм елемент в observe() щоб відслідковувать змінні в реальному часі   
    const {userStore} = useContext(Context);
    
    return(
        <aside className={styles.navBarLeft__container}>
            <div className={styles.navBarLeft__section}>
                
                <div className={styles.navBarLeft__part}>
                    <Link to={ACCOUNT_ROUTE} className={styles.navBarLeft__item}>
                    
                        <img
                            src={houseSvg}
                            alt="House"
                            className={styles.navBarLeft__item_img}
                        />
                        <h1 className={styles.navBarLeft__item_p}>Account</h1>
                    </Link>
                    <Link className={styles.navBarLeft__item}>
                        <img
                            src={houseSvg}
                            alt="House"
                            className={styles.navBarLeft__item_img}
                        />
                        <h1 className={styles.navBarLeft__item_p} onClick={() => userStore.logout()}>Loguot</h1>
                    </Link>
                </div>
                <div className={styles.navBarLeft__part}>
                    <Link className={styles.navBarLeft__item}>
                        <img
                            src={houseSvg}
                            alt="House"
                            className={styles.navBarLeft__item_img}
                        />
                        <h1 className={styles.navBarLeft__item_p} onClick={() => console.log(JSON.stringify(userStore.user))}>{userStore.isAuth ? "Email" + userStore.user.email : "Не авторизований"}</h1>
                    </Link> 

                    {/* My Article */}
                    <Link to={ MYARTICLES_ROUTE } className={styles.navBarLeft__item}>
                        <img
                            src={houseSvg}
                            alt="House"
                            className={styles.navBarLeft__item_img}
                        />
                        <h1 className={styles.navBarLeft__item_p}>My Articles</h1>
                    </Link>

                    {/* Create Article */}
                    <Link to={userStore.isAuth ? CREATE_ARTICLE : LOGIN_ROUTE} className={styles.navBarLeft__item}>
                        <img
                            src={houseSvg}
                            alt="House"
                            className={styles.navBarLeft__item_img}
                        />
                        <h1 className={styles.navBarLeft__item_p}>Create Article</h1>
                    </Link>

                    {/* MAIN */}
                    <Link to={MAIN_ROUTE} className={styles.navBarLeft__item}>
                        <img
                            src={houseSvg}
                            alt="House"
                            className={styles.navBarLeft__item_img}
                        />
                        <h1 className={styles.navBarLeft__item_p}>Головна</h1>
                    </Link>
                   
                    {/* Favourites */}
                    <Link to={MYFAVOURITES_ROUTE} className={styles.navBarLeft__item}>
                        <img
                            src={houseSvg}
                            alt="House"
                            className={styles.navBarLeft__item_img}
                        />
                        <h1 className={styles.navBarLeft__item_p}>Favourites</h1>
                    </Link>
                </div>
            </div>

        </aside>
    );
});

export default NavBarLeft;