import * as React from 'react';
import './DM.css'
import Avatar from './Avatar'
import { useGlobalContext } from '../Context'

const avatar = require('../../img/avatar.jpg') as string;
const vector = require('../../img/Vector_white.svg').default as string;

const Mssg = (props: any) =>{
    const { setRoom} = useGlobalContext()

    if ((props?.isDM | props?.isRoom)){

        var handle_submit = () => {
            setRoom(props?.room)
            props?.onClick("1")
            if (props?.isDM)
                props?.setoUser();
        }
        var _vector = <img src={vector}  alt="" />;
    }

    return (
    <div  className="mssg" style={props?.style} >
        <Avatar src={avatar} />
        <div className="c_text" onClick={handle_submit}>
            <div className="c_user">
                <div className="c_username">
                        <ul>{props?.name}</ul>
                        <p>{props?.mssg?.time} ms</p>
                        <div />
                </div>
                {_vector}
            </div>
            <div className="msssg">{props?.mssg?.text}</div>
        </div>
    </div>
    )
}

export default Mssg;