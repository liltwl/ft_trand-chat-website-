import * as React from 'react'
import { useState, useEffect} from 'react';
import Avatar from '../DM/Avatar'

import './sh.css'
import '../Home.css'
import TopButton from '../TopButton'
import Opt from '../live_chat/room_info/Opt';
const fill = require('../../img/Fill.svg').default as string;
const add = require('../../img/+.svg').default as string;
const Option = require('../../img/Options.svg').default as string;
const ava = require('../../img/avatar.jpg') as string;

const S_chat_topbar = (props: any) => {

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
            console.log("wsalna ")
        }
        var body=<img src={add} style={{cursor: "pointer"}} alt="" />
    }
    else{
            handle_submit = () =>{
            props?.onClick("1")
            props?.setoUser(props?.user)
            props.setRoom(props.room1)
            props?.setSlct(true)
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
    console.log(props.users)
    if (props?.users)
        var users = props.users.slice(0).reverse().map((user: any, index: number) => { 
            if (user?.user_name && props.user.user_name !== user?.user_name && !props?.room_users?.find((m:any)=>user?.user_name === m?.user_name)) 
            return(<User socket={props.socket} setRoom={props.setRoom} room={props?.room} room1={props.rooms.find((m:any)=> m.users.find((m:any)=>m.user_name===user.user_name))} adduser={props?.adduser} setSlct={props.setSlct} setoUser={props.setoUser} onClick={props.setStatus} key={index}  user={user}/>)})
    return (
        <>
        <S_chat_topbar setStatus={props.setStatus} title="Participants" />
        <div className="search" >
            <input className="M_input" placeholder="Search" type="text"/> 
        </div>
        <div className="users" >
            {users}
        </div> 
        </>
    );
}

export default Search