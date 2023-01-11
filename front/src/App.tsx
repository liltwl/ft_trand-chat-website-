import * as  React from 'react';
import Chat from './chat/Chat'
import io from 'socket.io-client';


const socket = io('http://localhost:8080');

function App(props:any)
{

    return (
        <>
            <div className="Root">
                <div className="Home">
                    <Chat socket={socket} />
                </div>
            </div>
        </>
        );
}

export default App;