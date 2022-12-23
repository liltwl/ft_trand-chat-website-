import React from 'react';
import Avatar from '../../DM/Avatar'
import fill from '../../../img/Fill.svg'
import Option from '../../../img/Options.svg'
import modify from '../../../img/modify.svg'
import addd_pic from '../../../img/add_pic.svg'
import exit from '../../../img/exit.svg';
import del from '../../../img/delete.svg'
import ava from '../../../img/avatar.jpg'
import { useState } from 'react';
import '../../search/sh.css'
import '../../Home.css'
import Top_button from '../../Top_button'
import "./room_info.css"

const Opt = (props) => {
    return (
        <>
            <div className='acc'>
                 <div  className='optins_icone'>
                    <ul>{props.text}</ul>
                    <img src={props.img} />
                 </div>
            </div>
        </>
    )
}

const S_chat_topbar = (props) => {
    const [style, setstyle] = useState({display:"none"})
    console.log(style)
    return (
        <div className="Chat-top-bar" s_padding={{padding: '14px 14px'}} >
            <Top_button src={fill} s_padding={{padding: '14px 14px'}} onClick={()=>props.setStatus(false)} />
                <div className="Text_c">
                    <ul className="L_title" style={{align_self: "center"}}>{props.title}</ul>
            </div>
                <div>
            <Top_button src={Option} s_padding={{padding: '8px 8px'}} onClick={() => {if(style.display === "none") setstyle({display:"flex"}); else setstyle({display:"none"}); }}/>
            <div id="myDropdown" style={style} className="dropdown-content">
                <Opt text='EXIT' img={exit} />
                <Opt text='Delete' img={del} />
            </div>
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


const Room = (props) =>{
    const [stat, setStat] = useState(true)
    const [name,setName] = useState(props.name)
    const [add_pic, setadd_pic] = useState(<></>)


    if (stat === true)    
        var body =  <ul className="Room_title">{name}</ul>
        else
            body = <input type="text" className="mssginput" id="1" name="input" value={name} onChange={(e) =>{ setName(e.target.value)}} ></input>



    return (
        <div className="Room_pic">
            <img src={ava} className="avatar" onMouseEnter={() => {setadd_pic(<div className='yoyo'  onMouseLeave={()=> setadd_pic(<></>)}>
                <img src={addd_pic} className='yoyo_img' style={{paddingTop: "10px"}} alt=""/>
                <ul className='yoyo_title'>Change room icon </ul> 
            </div>)}} />
            {add_pic}
            <div className="room_text">
                {body}
                <img src={modify} alt="" onClick={() => setStat(!stat)} />
            </div>
        </div>
    );
}


const User = (props) =>{
    return (
        <div className="user">
            <div className="av_text">
                <Avatar src={ava} />
                <ul className="L_title">{props.name}</ul>
            </div>
            <img src={Option} alt="" />
        </div>
    );
}

const  Room_info = (props) => {
    const [stt,setStt] = useState("0") ; //0:private, 1:public, 2:protected
    const [sh,setsh] = useState() ; //0:private, 1:public, 2:protected
    if (props?.users)
        var users = props.users.slice(0).reverse().map((user, index) => { if (user?.name) return(<User key={index} name={user.name} user={user}/>)})


        
        var search = <div className="s_search" style={{ padding: "0px", width:sh,transition: "all 0.5s"}}>
        <input className="M_input"  placeholder="Search" type="text" onSelect={(e) => setsh("100%")} onBlur={(e) => { if (!e.target.value) setsh("32px") }}/> 
        </div>

    return (
        <>
        <S_chat_topbar setStatus={props.setStat} title="Room info"  />
        <div className="room_body">
            <Room name={props.room.name}/>
            <Security  setStt={setStt} stt={stt}/>
            <div className="search_tab">
                <ul>Participants</ul>
                    {search}
            </div>
        <div className="users" style={{width: "100%",padding:"0px"}} >
            {users}
        </div>
        </ div>
        </>
    )
}

export default  Room_info;