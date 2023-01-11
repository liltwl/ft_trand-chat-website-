import * as React from 'react'
import { useState, useEffect} from 'react';
import Avatar from '../DM/Avatar'

import './sh.css'
import '../Home.css'
import TopButton from '../TopButton'
import Opt from '../live_chat/room_info/Opt';
import { useGlobalContext } from '../Context'


const fill = require('../../img/Fill.svg').default as string;
const add = require('../../img/+.svg').default as string;
const Option = require('../../img/Options.svg').default as string;
const ava = require('../../img/avatar.jpg') as string;


const SChatTopbar = (props: any) => {

    return (
        <div className="Chat-top-bar" >
            <TopButton src={fill} s_padding={{padding: '14px 14px'}} onClick={props.setStatus} />
                <div className="Text_c">
                    <ul className="L_title" >{props.title}</ul>
                </div>
                
            <div className="Select_tab" style={{width :"24px"}}/>
        </div>
    );
}



const User = (props: any) =>{
    const { setRoom, socket, room, user } = useGlobalContext()
    const [style, setstyle] = useState({display:"none"})
    const onClickOutside = () => setstyle({display:"none"});
    const ref = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event:any) => {
          if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside();
          }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [ref]);


    if (props?.adduser)
    {
        var handle_submit = () => {
            socket.emit('adduserToServer', {
                room_name: room.name,
                user_name: props.user.user_name,
              });
            console.log("wsalna ")
        }
        var body=<img src={add} style={{cursor: "pointer"}} alt="" />
    }
    else{
            handle_submit = () =>{
            props?.onClick("1")
            props?.setoUser(props?.user)
            setRoom(props.room1)
            props?.setSlct('0')
        }
        body = <div ref={ref}> <img src={Option} alt="" onClick={() => {if(style.display === "none") setstyle({display:"flex"}); else setstyle({display:"none"}); }}/>
                <div style={style} className="dropdown-content">
                <Opt text='DM' onClick={() => props?.setStat("2")} />

            </div></div>
}
    return (
        <div className="user" >
            <div style={{width: "100%"}}>
            <div className="av_text" onClick={handle_submit}>
                <Avatar src={ava} />
                <ul className="L_title">{props?.user.user_name}</ul>
            </div>
            </div>
            {body}
        </div>
    );
}



const Search = (props: any)  => {
    const { user, users, rooms } = useGlobalContext()
    console.log(rooms)
    if (users)
        var users_p = users.reverse().map((user_tmp: any, index: number) => { 
    if (user_tmp?.user_name && user?.user_name !== user_tmp?.user_name && !props?.room_users?.find((m:any)=>user_tmp?.user_name === m?.user_name)) 
        return(<User socket={props.socket}  room1={rooms.find((m:any)=> (m?.users?.find((m:any)=>m.user_name===user_tmp.user_name)&&m.users.find((m:any)=>user.user_name===m.user_name)))} adduser={props?.adduser} setSlct={props.setSlct} setoUser={props.setoUser} onClick={props.setStatus} key={index}  user={user_tmp}/>)
    return undefined;})
    return (
        <>
        <SChatTopbar setStatus={props.setStatus} title="Participants" />
        <div className="search" >
            <input className="M_input" placeholder="Search" type="text"/> 
        </div>
        <div className="users" >
            {users_p}
        </div> 
        </>
    );
}

export default Search