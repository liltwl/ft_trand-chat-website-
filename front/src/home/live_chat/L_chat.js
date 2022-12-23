
import React from 'react';
import '../Home.css'
import Top_button from '../Top_button'
import fill from '../../img/Fill.svg'
import union from '../../img/Union1.svg'
import MssgCompos from './Mssg_compos'
import { useState } from 'react';
import Mssg from '../DM/Mssg'
import '../DM/DM.css'
import Room_info from './room_info/Room_info'


const L_chat_topbar = (props) => {
    if (props?.setStatus)
        var handle_submit =() =>props.setStat(true);
    if (props.Subtitle !== "Room")
        var online =  <div className="online_bar"><div className="online_true"></div></div>;
    else 
        online = <Top_button src={union} onClick={handle_submit} s_padding={{padding: '10px 8.5px'}} />
    return (
        <div className="Chat-top-bar" s_padding={{padding: '14px 14px'}} >
            <Top_button src={fill} s_padding={{padding: '14px 14px'}} onClick={props.onClick} />
                <div className="Text_c">
                    <ul className="L_title">{props.title}</ul>
                    <ul className="Subtitle">{props.Subtitle}</ul>
                </div>
            {online}
        </div>
    );
}


const Mssgs = (props) => {

    if (props?.mssgs)
        var msssssg = props.mssgs.slice(0).reverse().map((mssg, index) => { if (mssg?.name) return(<Mssg key={index} name={mssg.name} mssg={mssg}/>)})
 return (
    <div className="mssgs">
        {msssssg}
    </div>
        );
}

const L_chat = (props) => {
    var message
    const [stat, setStat] = useState(false)
    
    const handleSendMessage = (e) => {
        e.preventDefault();
        message = document.getElementById('1').value
        if (message) {
            console.log(message)
          props.socket.emit('msgToServer', {
            room: props.room.name,
            mssg : {
            name: props.user?.name,
            text: message}
          });
        }
        document.getElementById('1').value =""
        props.setMssg(message);
      };


    if (props._slct === true)
        var selected = <L_chat_topbar title={props.room.name} mssgs={props?.mssgs} Subtitle="Direct Messege" onClick={props.onClick} />;
    else
        var selected = <L_chat_topbar title={props.room.name} Subtitle="Room" setStatus={props.setStatus}  onClick={props.onClick} setStat={setStat} />

    if (stat === true)
      var swahh = <Room_info users={props.users} setStat={setStat} stat={stat} room={props.room} />
    else
      swahh = <>
      {selected}
      <Mssgs mssgs={props?.mssgs} />
      <MssgCompos  handleSendMessage={handleSendMessage} />
            </>
    return (
        <>{swahh}</>
    );
}

export default L_chat;