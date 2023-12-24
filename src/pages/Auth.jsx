import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { Form, Link, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, MAIN_ROUTE, ACCOUNT_ROUTE } from "../utils/consts";
import { useLocation } from "react-router-dom"; // дозволяє отримати маршрут в запросе
import { registration, login } from "../http/userApi";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const Auth = observer(() => {
    const {userStore} = useContext(Context);

    const navigate = useNavigate()
    const location = useLocation() // дозволяє отримати маршрут в запросе
    
    //перевіряє чи зарез треба regist or login
    const isLogin = location.pathname === LOGIN_ROUTE

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nickName, setNickName] = useState('');


    //CHECK AUTH OR ACCOUNT PAGE
    useEffect(() => {
        if (userStore.isAuth) {
            navigate(ACCOUNT_ROUTE);
        }
    }, [userStore.isAuth, userStore.user, navigate]);


    const authClick = async () => {
        try{
            // let data;
            if(isLogin){
                // data = await login(email, password)
                userStore.login(email, password)
            } else{
                // data = await registration(email, password, nickName)
                userStore.registration(email, password)
            }
            // user.setUser(data.user)
            // user.setUser(data)
            // user.setIsAuth(true)
            navigate(ACCOUNT_ROUTE)
        }catch(err){
            alert(err.response.data.message)
        }


    }

    return (
        <div style={{width: 500, height: 250, background: 'grey', color: 'white'}}>
            <div style={{margin: 50, textAlign: "center"}}>
                <div style={{display: 'flex', flexDirection: 'column', gap: 20}}>

                    {isLogin ? (
                        <>
                            <input autoComplete="on" value={email} onChange={elem => setEmail(elem.target.value)} placeholder="email" style={{textAlign: 'center', fontSize: 20}} />
                            <input autoComplete="on" value={password} onChange={elem => setPassword(elem.target.value)} type="password" placeholder="password" style={{textAlign: 'center', fontSize: 20}} />
                        </>
                    ) : (
                        <>
                            <input autoComplete="on" value={email} onChange={elem => setEmail(elem.target.value)} placeholder="email" style={{textAlign: 'center', fontSize: 20}} />
                            <input autoComplete="on" value={nickName} onChange={elem => setNickName(elem.target.value)} placeholder="nickName (необов'язково)" style={{textAlign: 'center', fontSize: 20}} />
                            <input autoComplete="on" value={password} onChange={elem => setPassword(elem.target.value)} type="password" placeholder="password" style={{textAlign: 'center', fontSize: 20}} />
                        </>
                    )}

                    <div style={{display: "flex", gap: 15, justifyContent: 'right'}}>
                        {isLogin ? (
                            <>
                                <Link to={REGISTRATION_ROUTE} style={{width: 'auto', border: '1px solid', padding: 5, zIndex: 100, textDecoration: "none", color: 'inherit'}}>Не маєте аккаунт?</Link>
                                <button onClick={authClick} style={{width: 'auto'}}>Увійти</button>
                            </>
                            ) : (
                            <>
                                <Link to={LOGIN_ROUTE} style={{width: 'auto', border: '1px solid', padding: 5, zIndex: 100, textDecoration: "none", color: 'inherit'}}>Уже маєте аккаунт?</Link>
                                <button onClick={authClick} style={{width: 'auto'}}>Зареєструватися</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Auth;