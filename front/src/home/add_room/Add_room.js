import React from 'react';
import Avatar from '../DM/Avatar'
import fill from '../../img/Fill.svg'
import fill1 from '../../img/Arrow2.svg'
import Shape from '../../img/Shape.svg'
import Option from '../../img/Options.svg'
import modify from '../../img/modify.svg'
import Group from '../../img/Group.svg'
import ava from '../../img/avatar.jpg'
import addd_pic from '../../img/add_pic.svg'
import '../search/sh.css'
import '../Home.css'
import { useState } from 'react';
import Top_button from '../Top_button'
import '../live_chat/room_info/room_info.css'
import './Add_room.css'

const S_chat_topbar = (props) => {

    return (
        <div className="Chat-top-bar" s_padding={{padding: '14px 14px'}} >
            <Top_button src={fill} s_padding={{padding: '14px 14px'}} onClick={props.setStatus} />
                <div className="Text_c">
                    <ul className="L_title" style={{align_self: "center"}}>{props.title}</ul>
                </div>
            <div style={{width:"40px"}} />
        </div>
    );
}


const Room = (props) =>{
    const [name,setName] = useState(props.name?props.name:"")


    return (
        <div className="Room_pic">
            <img src={ava} className="avatar" />
            <div className='yoyo'  >
                <img src={addd_pic} className='yoyo_img' style={{paddingTop: "10px"}} alt=""/>
                <ul className='yoyo_title'>Change room icon </ul> 
            </div>
            <div className="room_text">
            <input type="text" className="room_userinput" id="3" name="input" value={name} placeholder="Room name" onChange={(e) =>{ setName(e.target.value)}} ></input>
            </div>
        </div>
    );
}
const Tab =  (props) => {
    if (props.stt === props.id)
        var style = {background: "#006CFF"}
    
    
    
        return (
        <div className="tab" style={style} onClick={props.onClick}>
            <ul className="tab_title" >{props.val}</ul>
        </div>
    );
}

const Security = (props) => {
    
    
    
    return (
        <>
        <div className="security" >
            <ul className="sec">security:</ul>
            <Tab val="private" stt={props.stt} id="0" onClick={() => props.setStt("0")} stat={props.stt}/>
            <Tab val="public" stt={props.stt} id="1" onClick={() => props.setStt("1")} stat={props.stt}/>
            <Tab val="protected" stt={props.stt} id="2" onClick={() => props.setStt("2")} stat={props.stt}/>
        </div>
        </>
    )
}



const Add_room = (props) => {
    const [stt,setStt] = useState("0") ; //0:private, 1:public, 2:protected
    const socket = props.socket;
    const handle_submit = () => {
        if (document.getElementById('3').value !== ""){
            socket.emit('createRoom', {name:document.getElementById('3').value, security: stt});
            props.setStatus("0");
        }
    }
    return (
        <>
        <S_chat_topbar setStatus={props.setStatus} title="Room"  />
        <div className="room_body">
            <Room name={props.room?.name}/>
        <Security  setStt={setStt} stt={stt}/>
        <div className="submit"> 
            <Top_button src={fill1} s_padding={({padding: '12.5px 12px'})} onClick={handle_submit} />
        </div>
        </div>
        </>
    );
}

export default Add_room;