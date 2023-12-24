import React, { useContext, useEffect, useRef, useState } from "react";
import { createArticle, createArticleContent } from "../services/ArticleService";
import { observer } from "mobx-react-lite";
import { Context } from "..";

import b64toBlob from "b64-to-blob";
import { v4 as uuidv4 } from 'uuid';

// CHEERIO
import * as cheerio from 'cheerio';

import { PREVIEW_EXAMPLECONTENT, MAIN_EXAMPLECONTENT } from "../utils/creaArtExpamleText";

// QUILL
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ImageResize from 'quill-image-resize-module-react';
Quill.register('modules/imageResize', ImageResize);

const CreateArticle = observer(() => {
    const {userStore} = useContext(Context);
    const [info, setInfo] = useState("");
        // useEffect(()=>{
        //     if (!userStore.isAuth) {//
        //         navigate(LOGIN_ROUTE);
        //     } 
        // }, [])
    useEffect(()=>{
        setContentPreview(PREVIEW_EXAMPLECONTENT);
        setContentMain(MAIN_EXAMPLECONTENT);
    },[])
        
    const getTitle = (content) => {
        if (!content) {
            return null;
        }

        const targetTags = ['h1', 'p', 'h2', 'h3', 'h4', 'h5', 'h6'];
        let title;
        const $ = cheerio.load(content);

        for (const tag of targetTags) {
            const foundTag = $(tag).first();
            if (foundTag.length > 0) {
                title = foundTag.text();
                break;
            }
        }

        return title;
    }

    const contentChange = (matchContent, content, formData, base64Regex) => {
        let newContent = content;

        if(!matchContent){
            return content;
        }
        
        for (let i = 0; i < matchContent.length; i++) {
            const element = matchContent[i].match(base64Regex);
            // element[0] "data:image/png;base64,iVBORw...
            // element[1] "iVBORw0KGg...
            if(element){
                const fileType = element[0].split(';')[0].split('/')[1]; // File type

                let imgName = uuidv4() + "." + fileType; 

                newContent = newContent.replace(
                    matchContent[i],
                    `<img src="${imgName}" alt="Image"${matchContent[i].match(/width="[^"]*"/) || ''}>`
                );

                var blobImage = b64toBlob(element[1], fileType);
                formData.append('images', blobImage, imgName);
            }else{
                console.log("Invalid base64-encoded image data in matchContent")
            }
        }
        return newContent;
    }
    const addArticle = () => {
        //залежить від PREVIEW_EXAMPLECONTENT MAIN_EXAMPLECONTENT
        if (
            (contentMain === '<h1 class="ql-align-center"><br></h1>' || contentMain === '<p><br></p>') ||
            (contentPreview === '<h1 class="ql-align-center"><br></h1>' || contentPreview === '<p><br></p>')
        ) {
            setInfo("Please write a valid text!");
            return;
        }
        // TITLE
        const title = getTitle(contentPreview);
        if(!title){
            setInfo("TITLE is undefined or empty. Please provide a valid text!");
            return;
        }

        // IMG and replace content
        const regex = /<img[^>]*>/g;

        const matchPreview = contentPreview.match(regex);
        const matchMain = contentMain.match(regex);

        const base64Regex = /data:image\/\w+;base64,([^"]+)/;

        const formDataArticle = new FormData();
        const newContentPreview = contentChange(matchPreview, contentPreview, formDataArticle, base64Regex)
        const newContentMain = contentChange(matchMain, contentMain, formDataArticle, base64Regex)
       
        formDataArticle.append("title", title);
        formDataArticle.append("contentPreview", newContentPreview);
        formDataArticle.append("contentMain", newContentMain);
        formDataArticle.append("userId", userStore.user.id);
        try {
            createArticle(formDataArticle)
        } catch (error) {
            console.log(error)
        } finally{
            console.log("OK")
            clear("ALL")
            setInfo("")
        }

        // formDataArticle.forEach((value, key) => {
        //     console.log(key, value);
        // });
    };
    //Quill quill-image-resize
    const [contentPreview, setContentPreview] = useState('');
    const [contentMain, setContentMain] = useState('');
    const [activeEditor, setActiveEditor] = useState("editor1");
        
    const modules = {
            toolbar: {
                container: '#custom-toolbar',
            },
            imageResize: {
                parchment: Quill.import('parchment'),
                modules: ['Resize', 'DisplaySize']
            }
    };
    const modules2 = {
            toolbar: {
                container: '#custom-toolbar2',
            },
            imageResize: {
                parchment: Quill.import('parchment'),
                modules: ['Resize', 'DisplaySize']
            }
    };
    const customToolbarStyle = {
            common: {
                backgroundColor: 'grey',
                position: 'sticky',
                top: '50px',
                zIndex: '1000'
            },
            activeToolbar: { 
                display: 'block'
            }, 
            notActiveToolbar: { 
                display: 'none'
            }, 
            editor1: {
                backgroundColor: '#2e2e2e',
            },
            editor2: {
                backgroundColor: '#656464',
            },
    };
    
    const clear = (whatToClear) => {
        switch (whatToClear) {
            case "PREVIEW":
                setContentPreview()
                break;
            case "MAINCONTENT":
                setContentMain()
                break;
            case "ALL":
                setContentPreview()
                setContentMain()
                break;
        }
    }

    return (
        <div style={{}}>

            <div id="custom-toolbar" 
                style={{ 
                    ...customToolbarStyle.common, 
                    ...(activeEditor === 'editor1' ? customToolbarStyle.activeToolbar : customToolbarStyle.notActiveToolbar) 
                    }}>
                    <button className="ql-bold">Bold</button>
                    <button className="ql-italic">Italic</button>
                    <button className="ql-underline">Underline</button>
                    <button className="ql-strike">Strike</button>
                    <button className="ql-list" value="ordered">Ordered List</button>
                    <button className="ql-list" value="bullet">Bullet List</button>
                    <button className="ql-image">Image</button>
                    <button className="ql-link">Link</button>
                    <button className="ql-video">Video</button>
                    <button className="ql-blockquote">Blockquote</button>
                    <button className="ql-code-block">Code Block</button>
                    <button className="ql-clean">Remove Formatting</button>
                    <select className="ql-color">
                        <option value="red"></option>
                        <option value="green"></option>
                        <option value="blue"></option>
                        <option value="orange"></option>
                        <option value="violet"></option>
                    </select>
                    <select className="ql-background">
                        <option value="red"></option>
                        <option value="green"></option>
                        <option value="blue"></option>
                        <option value="orange"></option>
                        <option value="violet"></option>
                    </select>
                    <button className="ql-align" value=""></button>
                    <button className="ql-align" value="center"></button>
                    <button className="ql-align" value="right"></button>
                    <button className="ql-align" value="justify"></button>
                    <button className="ql-indent" value="-1"></button>
                    <button className="ql-indent" value="+1"></button>
                    <button className="ql-script" value="sub"></button>
                    <button className="ql-script" value="super"></button>
                    <button className="ql-header" value="1"></button>
                    <button className="ql-header" value="2"></button>
                    <button className="ql-blockquote"></button>
                    <button className="ql-code-block"></button>
                    <button className="ql-clean"></button>
                    <button className="ql-emoji"></button>
            </div>
            <div id="custom-toolbar2" 
                style={{
                    ...customToolbarStyle.common,
                    ...(activeEditor === 'editor1' ? customToolbarStyle.notActiveToolbar : customToolbarStyle.activeToolbar) 
                    }}>
                        <button className="ql-bold">Bold</button>
                        <button className="ql-italic">Italic</button>
                        <button className="ql-underline">Underline</button>
                        <button className="ql-strike">Strike</button>
                        <button className="ql-list" value="ordered">Ordered List</button>
                        <button className="ql-list" value="bullet">Bullet List</button>
                        <button className="ql-image">Image</button>
                        <button className="ql-link">Link</button>
                        <button className="ql-video">Video</button>
                        <button className="ql-blockquote">Blockquote</button>
                        <button className="ql-code-block">Code Block</button>
                        <button className="ql-clean">Remove Formatting</button>
                        <select className="ql-color">
                            <option value="red"></option>
                            <option value="green"></option>
                            <option value="blue"></option>
                            <option value="orange"></option>
                            <option value="violet"></option>
                        </select>
                        <select className="ql-background">
                            <option value="red"></option>
                            <option value="green"></option>
                            <option value="blue"></option>
                            <option value="orange"></option>
                            <option value="violet"></option>
                        </select>
                        <button className="ql-align" value=""></button>
                        <button className="ql-align" value="center"></button>
                        <button className="ql-align" value="right"></button>
                        <button className="ql-align" value="justify"></button>
                        <button className="ql-indent" value="-1"></button>
                        <button className="ql-indent" value="+1"></button>
                        <button className="ql-script" value="sub"></button>
                        <button className="ql-script" value="super"></button>
                        <button className="ql-header" value="1"></button>
                        <button className="ql-header" value="2"></button>
                        <button className="ql-blockquote"></button>
                        <button className="ql-code-block"></button>
                        <button className="ql-clean"></button>
                        <button className="ql-emoji"></button>
            </div>
            
           
            <div>
                <div    onClick={() => setActiveEditor("editor1")}>
                    <ReactQuill 
                        theme="snow" 
                        value={contentPreview}
                        onChange={(value) => (
                            setContentPreview(value),
                            setActiveEditor("editor1")
                            )}
                        modules={modules}
                        style={customToolbarStyle.editor1}
                    />
                </div>

                <div  onClick={() => setActiveEditor("editor2")}>
                    <ReactQuill 
                        theme="snow" 
                        value={contentMain}
                        onChange={(value) => (
                            setContentMain(value),
                            setActiveEditor("editor2")
                            )}
                        modules={modules2}
                        style={customToolbarStyle.editor2}
                    />
                </div>

            </div>


            <div style={{ marginTop: '15px', display: 'flex', gap: '10px'}}>
                <button 
                    onClick={() => {
                        clear("PREVIEW")
                    }}>Очистити Preview
                </button>

                <button 
                    onClick={() => {
                        clear("MAINCONTENT")
                    }}>Очистити статю
                </button>
                <button 
                    onClick={() => {
                        clear("ALL")
                    }}>Очистити все
                </button>
            </div>

            <div style={{ marginTop: '15px', marginBottom: '50px', display: 'flex', gap: '10px'}}>
                <button 
                    onClick={() => {
                        addArticle()
                    }}>Опублікувати
                </button>

                <div style={{color: 'red'}}>
                    {info}
                </div>
            </div>

            {/* як виводить з стилями quill */}
            {/* <div className="ql-snow">
                <div className="ql-editor" dangerouslySetInnerHTML={{ __html: content }} />
            </div> */}


        </div>
    );
    });

    export default CreateArticle;
