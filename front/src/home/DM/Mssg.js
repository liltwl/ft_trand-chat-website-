import React from 'react';
import './DM.css'
import avatar from '../../img/avatar.jpg'
import vector from '../../img/Vector_white.svg'
import Avatar from './Avatar'
const Mssg = (props) =>{

    if ((props?.isDM | props?.isRoom)){

        var handle_submit = () => {props.setRoom(props?.room)
            props.onClick("1")}
        var _vector = <img src={vector}  alt="" />;
    }
    const d = new Date();

    return (
    <div  className="mssg" style={props.style} >
        <Avatar src={avatar} />
        <div className="c_text" type="button" onClick={handle_submit}>
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