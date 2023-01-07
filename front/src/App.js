import React, { useState, useEffect } from 'react';
import Chat from './chat/Chat'
import io from 'socket.io-client';



function App()
{
    //const [socket, setSocket] = useState();
    return (
        <>
            <div className="Root">
                <div className="Home">
                    <Chat  />
                </div>
            </div>
        </>
        );
}

export default App;