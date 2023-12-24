import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userApi";
import Spinner from 'react-bootstrap/Spinner';
import NavBarLeft from "./components/NavBarLeft/NavBarLeft";

const App = observer(() => {
  // const {user} = useContext(Context)
  // // для загрузки, Логіка(крутилка загрузки потім відправляєтсья запрос на 
  // //провірку користувача, коли повернулася відповідь робим false)
  // const [loading, setLoading] = useState(true)

  // //треба відправлять тількі один раз при відкриті для цього useEffect()
  // useEffect(() => {
  //   check().then(data =>{
  //     user.setUser(true)
  //     user.setIsAuth(true)
  //   }).finally(() => setLoading(false))
  // }, [])

  // useEffect(() => {
  //   check().then(data => {
  //       user.setUser(true)
  //       user.setIsAuth(true)
  //   }).finally(() => setLoading(false))
  // }, [])

  // if(loading){
  //   return <Spinner animation={"grow"}/>
  // }
  const {userStore} = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching data...");
        await userStore.checkAuth();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userStore]);

  if (userStore.isLoading) {
    return <Spinner animation={"grow"} />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <div style={{background: 'var(--bgColor)', display: 'flex', marginTop: '50px', alignItems: 'flex-start', flexDirection: 'row'}}>

        <NavBarLeft />
        <div style={{width: 'calc(100vw - 240px)', position: 'relative'}}>
          <AppRouter />
        </div>

      </div>
    </BrowserRouter>     
  );
});

export default App;
