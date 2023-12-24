import React, { useContext } from "react";
import { Context } from "../..";

import { ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "../../utils/consts";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

import styles from "./NavBar.module.css"
import { Link } from "react-router-dom";

import Logo from "../img/navBar/LogoSvg.svg"

const NavBar = observer(() => { // обертаєм елемент в observe() щоб відслідковувать змінні в реальному часі   
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () =>{
        user.setUser({})
        user.setIsAuth(false)
        // navigate(SHOP_ROUTE)
    }

    return(
        <div className={styles.navBar__container}>
            <nav>
                <ul className={styles.header__links}>
                    <li>
                        <Link className={styles.header__link}>
                            <img style={{width: '200px', background: 'rgba(121, 121, 121, 0.8)'}} src={Logo}/>
                        </Link>
                    </li>
                    <li>

                        <Link className={styles.header__link}>
                            Account
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
});

{/* {user.isAuth ?
    <Nav className="d-flex gap-2 align-items-center">
        <Nav.Link href="#" onClick={() => navigate(ADMIN_ROUTE)}>Admin panel</Nav.Link>
        <Nav.Link href="#" onClick={logOut}>Вийти</Nav.Link>
    </Nav>
    :
    <Nav>
        <Nav.Link href="#" variant="outline-success" onClick={() => navigate(LOGIN_ROUTE)}>Авторизуватися</Nav.Link>
    </Nav>
} */}
export default NavBar;