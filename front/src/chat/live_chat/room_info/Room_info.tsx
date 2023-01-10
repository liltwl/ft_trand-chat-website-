import * as React from 'react';
import { useEffect} from 'react';
import Avatar from '../../DM/Avatar'
import { useState } from 'react';
import '../../search/sh.css'
import '../../Home.css'
import TopButton from '../../TopButton'
import "./room_info.css"
import "../../add_room/Add_room.css"
import Opt from "./Opt"
import { useGlobalContext } from '../../Context'

const fill = require('../../../img/Fill.svg').default as string;
const Option = require('../../../img/Options.svg').default as string;
const modify = require('../../../img/modify.svg').default as string;
const addd_pic = require('../../../img/add_pic.svg').default as string;
const exit = require('../../../img/exit.svg').default as string;
const ava = require('../../../img/avatar.jpg') as string;
const del = require('../../../img/delete.svg').default as string;
const add = require('../../../img/+.svg').default as string;



const Schattopbar = (props: any) => {
    const [style, setstyle] = useState({display:"none"})
    const onClickOutside = () => setstyle({display:"none"});
    const ref = React.useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event :any) => {
          if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside();
          }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [ref]);

    
    return (
        <div className="Chat-top-bar"  >
            <TopButton src={fill} s_padding={{padding: '14px 14px'}} onClick={()=>props.setStat("1")} />
                <div className="Text_c">
                    <ul className="L_title" >{props.title}</ul>
            </div>
                <div ref={ref}>
            <TopButton src={Option} s_padding={{padding: '8px 8px'}} onClick={() => {if(style.display === "none") setstyle({display:"flex"}); else setstyle({display:"none"}); }}/>
            <div style={style} className="dropdown-content">
                {props.isadmin === false && 
                <Opt text='Add user' img={add} onClick={() => props.setStat("2")} />}
                <Opt text='EXIT' style={{color:"#FF0000"}} img={exit}  onClick={() => {props.setStatus("0")}} />
                {props.isadmin === false &&
                <Opt text='Delete' style={{color:"#FF0000"}} img={del} onClick={() => {props.setStatus("0")}} />} 
            </div>
            </div>
        </div>
    );
}
const Tab =  (props :any) => {
    if (props.stt === props.id)
        var style = {background: "#006CFF"}
    
        return (
        <div className="tab" style={style} onClick={props.onClick}>
            <ul className="tab_title" >{props.val}</ul>
        </div>
    );
}

const Security = (props :any) => {
    
    return (
        <>
        <div className="security" >
            <ul className="sec">security:</ul>
            <Tab val="private" stt={props.stt} id="0" onClick={() =>{ if (props.isowner) props.setStt("0")}} stat={props.stt}/>
            <Tab val="public" stt={props.stt} id="1" onClick={() => { if (props.isowner)props.setStt("1")}} stat={props.stt}/>
            <Tab val="protected" stt={props.stt} id="2" onClick={() => { if (props.isowner)props.setStt("2")}} stat={props.stt}/>
        </div>
        </>
    )
}




const Room = (props:any) =>{
    const [stat, setStat] = useState(true)
    const [name,setName] = useState(props.name)
    const [add_pic, setadd_pic] = useState(<></>)
    


    if (stat === true)    
        var body =  <ul className="Room_title" style={props.isadmin===true?{padding:"0px"}:{}}>{name}</ul>
        else
            body = <input type="text" className="mssginput" id="1" name="input" value={name} onChange={(e) =>{ setName(e.target.value)}} ></input>



    return (
        <div className="Room_pic">
            <img src={ava} alt='' className="avatar" onMouseEnter={() => 
                {setadd_pic(<div className='yoyo'  onMouseLeave={()=> setadd_pic(<></>)}>
                                <img src={addd_pic} className='yoyo_img' style={{paddingTop: "10px"}} alt=""/>
                                <ul className='yoyo_title'>Change room icon </ul> 
                            </div>)}
                        } />
            {add_pic}
            <div className="room_text">
                {body}
                {props.isadmin === false &&<img src={modify} alt="" onClick={() => setStat(!stat)} />}
            </div>
        </div>
    );
}




const User = (props:any) =>{



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

    return (
        <div className="user" >
            <div className="av_text" >
                <Avatar src={ava} />
                <ul className="L_title">{props.user.user_name}</ul>


                {props?.isadmin === false &&<div className='admin'><ul className='admin_title'>Admin</ul></div>}


            </div>
            {props.is_user_admin === false && props.user.user_name !== props.name && <div ref={ref}>
            <img src={Option} style={{cursor: "pointer"}} alt="" onClick={() => {if(style.display === "none") setstyle({display:"flex"}); else setstyle({display:"none"}); }} />
            <div id="myDropdown" style={style} className="dropdown-content"  >
            {props?.isadmin ===true && <Opt text='Make room admin' />}
                <Opt text='REMOVE' />
                <Opt text='ban' />
            </div>
            </div>}
        </div>
    );
}


const Passw = (props:any) =>{

    return (
        <>
        <div  className="passw" >
            <ul className='sec'>Password:</ul>
            <input className='passwcomp' id='passw' value={props?.value} type={'password'} onChange={(e) =>{ props?.setpassw(e.target.value)}}  />
        </div>
        </>
        )
}


const  Room_info = (props:any) => {
    const { user, room } = useGlobalContext()

    const [stt,setStt]  = useState(room.status.toString(10) as string ) ; //0:private, 1:public, 2:protected
    const [sh,setsh] = useState("");
    const [passw,setpassw] = useState(room?.passw as string);

    var users_p = room?.users.map((user1:any, index:number) => { return(<User is_user_admin={!room.admins.find((m:any)=>user.user_name===m.user_name)} isadmin={!room.admins.find((m:any)=>user1.user_name===m.user_name)} key={index} name={user1.user_name} user={user}/>)})
        


    if(stt === "2" && room?.owner?.user_name === user.user_name)
        var pass = <Passw value={passw} setpassw={setpassw}/>
    return (
        <>
        <Schattopbar isadmin={!room.admins.find((m:any)=>user.user_name===m.user_name)}  setStat={props.setStat} setStatus={props.setStatus} title="Room info"  />
        <div className="room_body">
            <Room isadmin={!room.admins.find((m:any)=>user.user_name===m.user_name)} name={room.name}/>
            <Security  setStt={setStt} isowner={user.user_name === room.owner.user_name} stt={stt}/>
            {pass}
            <div className="search_tab">
                <ul>Participants</ul>
                <div className="s_search" style={{ padding: "0px", width:sh,transition: "all 0.5s"}}>
                    <input className="M_input"  placeholder="Search" type="text" onSelect={() => setsh("100%")} onBlur={(e) => { if (!e.target.value) setsh("32px") }}/> 
                 </div>
            </div>
        <div className="users" style={{width: "100%",padding:"0px"}} >
            {users_p}
        </div>
        </ div>
        </>
    )
}

export default  Room_info;