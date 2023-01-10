import React, { useState, useEffect } from 'react';
import Chat from './chat/Chat'
import io from 'socket.io-client';
import {
    Switch,
    Routes,
    Route,
    BrowserRouter
  } from "react-router-dom";


function App()
{
    const [userr,setusr] = useState({});
    console.log(userr);
    useEffect(()=> {
        }, [])
    //const [socket, setSocket] = useState();
    return (
        <>
            <div className="Root">
                <div className="Home">
                    <Chat setusr={setusr}/>
                </div>
            </div>
        </>
        );
}

export default App;