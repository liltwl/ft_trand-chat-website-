import * as React from 'react';
import '../search/sh.css'
import '../Home.css'
import { useState } from 'react';
import TopButton from '../TopButton'
import '../live_chat/room_info/room_info.css'
import './Add_room.css'
// import { useGlobalContext} from '../Context'

const fill = require('../../img/Fill.svg').default as string;
const fill1 = require('../../img/Arrow2.svg').default as string;
const ava = require('../../img/avatar.jpg') as string;
const addd_pic = require('../../img/add_pic.svg').default as string;

const SChatTopbar = (props: any) => {

    return (
        <div className="Chat-top-bar" /*s_padding={{padding: '14px 14px'}}*/ >
            <TopButton src={fill} s_padding={{padding: '14px 14px'}} onClick={props.setStatus} />
                <div className="Text_c">
                    <ul className="L_title" >{props.title}</ul>
                </div>
            <div style={{width:"40px"}} />
        </div>
    );
}


const Room = (props:any) =>{
    const [name,setName] = useState(props.name?props.name:"")


    return (
        <div className="Room_pic">
            <img src={ava} alt='' className="avatar" />
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
const Tab =  (props:any) => {
    if (props.stt === props.id)
        var style = {background: "#006CFF"}
    
    
    
        return (
        <div className="tab" style={style} onClick={props.onClick}>
            <ul className="tab_title" >{props.val}</ul>
        </div>
    );
}

const Security = (props:any) => {
    
    
    
    return (
        <>
        <div className="security" >
            <ul className="sec">Security:</ul>
            <Tab val="private" stt={props.stt} id="0" onClick={() => props.setStt("0")} stat={props.stt}/>
            <Tab val="public" stt={props.stt} id="1" onClick={() => props.setStt("1")} stat={props.stt}/>
            <Tab val="protected" stt={props.stt} id="2" onClick={() => props.setStt("2")} stat={props.stt}/>
        </div>
        </>
    )
}

const Passw = (props:any) =>{
    return (
        <>
        <div  className="passw" >
            <ul className='sec'>Password:</ul>
            <input className='passwcomp' id='passw' type={'password'} />
        </div>
        </>
        )
}



const Addroom = (props:any) => {
    const [stt,setStt] = useState("0") ; //0:private, 1:public, 2:protected

    const handle_submit = () => {
        if ((document.getElementById('3') as HTMLInputElement)?.value !== ""){
            // socket.emit('createRoom', {name:document.getElementById('3').value, status: stt,pass:document.getElementById('passw')?.value});
            console.log({name:(document.getElementById('3') as HTMLInputElement)?.value, status: stt,pass:(document.getElementById('passw') as HTMLInputElement)?.value})
            props.setStatus("0");
        }
    }

    return (
        <>
        <SChatTopbar setStatus={props.setStatus} title="Room"  />
        <div className="room_body">
            <Room name={props.room?.name}/>
        <Security  setStt={setStt} stt={stt}/>
        {stt === "2" && <Passw />}
        <div className="submit"> 
            <TopButton src={fill1} s_padding={({padding: '12.5px 12px'})} onClick={handle_submit} />
        </div>
        </div>
        </>
    );
}

export default Addroom;