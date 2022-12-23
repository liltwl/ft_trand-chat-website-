import React, { useState, useEffect } from 'react';
import Home from './home/Home'
import io from 'socket.io-client';
import { UserContext } from './home/context';


const socket = io.connect('http://localhost:8080');

function App()
{
    //const [socket, setSocket] = useState();
    return (
        <>
         <UserContext.Provider value={{socket}}>
            <div className="Root">
                <div className="Home">
                    <Home socket={socket} />
                </div>
            </div>
        </UserContext.Provider>
        </>
        );
}

export default App;