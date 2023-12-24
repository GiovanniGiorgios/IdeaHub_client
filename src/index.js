  // axios - для того щоб відправляти запроси на сервер
  // react-router-dom -  для постраничной навигации
  // mobx - стейт менеджер  "для отслеживания и управления данными, которые могут изменяться в процессе работы приложения"
  // mobx-react-lite - щоб звязати mobx з функціональними компонентами reacta

  import React, { createContext } from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './App';
  import UserStore from './store/UserStore';
  import DeviceStore from './store/DeviceStore';
  import ArticleStore from './store/ArticleStore';

  import "./index.css"; // Імпорт файлу стилів

  export const Context = createContext(null)

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Context.Provider value={{
      userStore: new UserStore(),
      //device: new DeviceStore(),
      articleStore: new ArticleStore(),
    }}>
      <App />
    </Context.Provider>
  );
  /////