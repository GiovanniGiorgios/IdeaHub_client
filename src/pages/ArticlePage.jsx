import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { fetchArticleContent, fetchOneArticle } from "../services/ArticleService";
import { observer } from "mobx-react-lite";
import { Context } from "..";

import styles from "./ArticlePage.module.css"

import Messages from "./Messages";
import io from "socket.io-client"; // Імпортуйте бібліотеку

const FIELDS = {
    USERNAME: "username",
    ROOM: "room",
};


// треба додати в базу данних до models User імя 

// потрібно просто підключаться до чату без імені, 
//бо з головної не авторизований користувач також може зайти 
//потрібно посилати до сокета імя та можливість писати тількі якщо авторизуватись 
//також потрібно додати галочку чи показувати імя всім чи анонімно
//чи найкраще додати в базу данних Реальне імя та Ник і потім давати можливість вибору

const ArticlePage = observer(() => {
    const {userStore} = useContext(Context);

    const navigate = useNavigate();
    
    const [article, setArticle] = useState({});
    const [articleContent, setArticleContent] = useState({});
    const { id } = useParams();
    
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState(0);
    const socket = io("http://localhost:9000");
    
    const location = useLocation() // дозволяє отримати маршрут в запросе
    const [mainImage, setMainImage] = useState(null);

    ///
    const u = userStore.user.id ? userStore.user.id.toString() : "Anonim";
    const r = location.pathname;
    const params = { name: u, room: r };
    // Підключення до WebSocket сервера
    useEffect(() => {

        socket.emit("join", params);
  
        socket.on("message", ({data}) => {
            setMessages((_message) => [..._message, data])
        });
  
        // Обробник події "connect", яка виконується при підключенні до сервера
        socket.on("connect", () => {
            console.log("Connected to WebSocket Server");
        });
  
  
        // При завершенні компонента, закрийте з'єднання
        return () => {
            socket.disconnect();
        };
    }, []);
    ////////
    useEffect(() => {
        fetchOneArticle(id).then((data) => {
            setArticle(data)
        })

        // fetchArticleContent(id).then(data => setArticleContent(data))
    }, [])
    //////////
    const [message, setMessage] = useState("");

    const handleChange = ({ target: { value } }) => {
        setMessage(value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!message) return;
        socket.emit("sendMessage", { message, params });
        setMessage("");
    };
    const leftRoom = () => {
        socket.emit("leftRoom", { params });
        navigate("/");
    };
    ///// RETURN /////
    if(userStore.isLoading){
        return (
            <div>
                <h1>Loading...</h1>
            </div>
        )
    }else{
        return (
            <div style={{textAlign: 'center', background: '#6c6c6c'}}>
                <div>
                    <h1>Заголовок: {article.title}</h1>
                </div>
                <div>
                    <img src={mainImage} />
                </div>
                <div>
                    <p>Головна думка: {article.text}</p>
                </div>
    
                <div>
                    <h1>Article Texts:</h1>
                    
                    {articleContent.articleTexts && articleContent.articleTexts.map((text, index) => (
                        <div key={index}>
                            <p>Text {index + 1}: {text.text}</p>
                            {/* Тут ви можете вивести інші властивості, якщо необхідно */}
                        </div>
                    ))}
                </div>
                <div>
                <h1>Article Imgs:</h1>
                    
                    {articleContent.articleImgs && articleContent.articleImgs.map((img, index) => (
                        <div key={index}>
                            <img src={process.env.REACT_APP_API_URL + img.img} />
                        </div>
                    ))}
                </div>
    
                <div style={{background: '#acacac'}}>
                    <div  style={{paddingBottom: '15px', paddingTop: '15px'}}>
                        <h1>Обговорення:</h1>
                        
    
                        <>
                            <div className={styles.wrap}>
                                <div className={styles.header}>
                                    <div className={styles.title}>{params.room}</div>
                                    <div className={styles.users}>{users} users in this room</div>
                                    <button className={styles.left} onClick={leftRoom}>
                                    Left the room
                                    </button>
                                </div>
    
                                <div className={styles.messages}>
                                    <Messages messages={messages} name={params.name} />
                                </div>
    
                                <form className={styles.form} onSubmit={handleSubmit}>
                                    <div className={styles.input}>
                                    <input
                                        type="text"
                                        name="message"
                                        placeholder="What do you want to say?"
                                        value={message}
                                        onChange={handleChange}
                                        autoComplete="off"
                                        required
                                    />
                                    </div>
    
                                    <div className={styles.button}>
                                    <input type="submit" value="Send a message" />
                                    </div>
                                </form>
                            </div> 
                        </>
                    </div>
                </div>
            </div>
        );
    }
});

export default ArticlePage;