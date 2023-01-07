import * as React from 'react';
import './Home.css'
import axios from 'axios'
import { useState } from 'react';
import DM from './DM/DM'
import './DM/DM.css'
import L_chat from './live_chat/L_chat'
import Search from './search/Search'
import TopButton from './TopButton'
import { useEffect } from 'react';
import Add_room from './add_room/Add_room'

const Vector = require('../img/Vector.svg').default as string;
const Union = require('../img/Union.svg').default as string;
const fill1 = require('../img/Fill1.svg').default as string;


const Tab = (props: any) => {
    var t_style = {background: 'none'}
    if (props.selected === true)
        t_style.background = '#004CCC'
    else if (props.selected === false)
        t_style.background = 'none'
    return (
        <>
        <div className="tab_root" title={props.title}
        onClick={() => {
            if ((props?.selected !== props && !props?.selected) || (props.selected === props.slct && !props.selected))
                props.onClick();
            }}
            >
            <div className="Select_tab" style={t_style}/>
                <div className="tab_title">
                    <ul>{props.title}</ul>
                </div>
            <div className="Select_tab"/>
        </div> 
        </>
    );
}



const Chat_top_bar = (props: any) => {
    return (
        <div className="Chat-top-bar">
            <TopButton src={Vector} s_padding={{padding: '12px 16px'}} />
            <div className="add_room" >
                <TopButton title="Add new room" src={fill1} s_padding={{padding: '11px 11px'}} setStatus={()=>props.setStatus("3")}/>
                <TopButton src={Union}  num={props.value} setStatus={() => props.setStatus("2")}/>
            </div>
        </div>
    );
};



const Home_p = (props: any) => {
    // const Haneselect = () => props?.setSlct(!props?._slct);

    if (props?._slct === true)
        var swahh = <DM isDM={true} user={props.user} setoUser={props.setoUser} otheruser={props?.otheruser} setRoom={props?.setRoom} setMssgs={props?.setMssgs}  rooms={props?.rooms} setStatus={props?.setStatus} onClick={props?.setStatus}/> ;
    else
        swahh = <DM isRoom={true} setRoom={props?.setRoom} setMssgs={props?.setMssgs}  rooms={props?.rooms} setStatus={props?.setStatus} onClick={props?.setStatus}/> ;
    return (
    <>
        <Chat_top_bar value={props.value} setStatus={props?.setStatus} />
        <div   className="Bars"  >
            <Tab title="DM" selected={props?._slct} slct={props?._slct} onClick={() => props?.setSlct(!props?._slct)}/>
            <Tab title="ROOM" selected={(!props?._slct)} slct={props?._slct}  onClick={() => props?.setSlct(!props?._slct)}/>
        </div>
        {swahh}
    </>
    );
};






const Home = (props: any) => {
    const [status, setStatus] = useState("0"); // 0: normal, 1: livechat , 2: members, 3: add_room
    const [slct, setSlct] = useState(true);  // 0 :room and 1 DM
    
    
    
    const [room, setRoom] = useState({})
    const [mssgs, setMssgs] = useState([])
    const [rooms, setRooms] = useState();
    const [user, setUser] = useState() as any;
    const [otheruser, setoUser] = useState(undefined); 
    const [users, setUsers] = useState([]);


    const messageset = (message: any) => {
        if (message)
            setMssgs(mssgs =>[...mssgs, {name: user.user_name,text: message}]);
        console.log(mssgs)
    };
    
    useEffect(()=> {
        axios.get('data.json').then((data) => {setRooms(data.data.data.rooms); setUsers(data.data.data.users)})
    } , [])
    
    
    if (!user?.user_name)
        var user_p = <div className="user_h"><div className="user_p"><ul>name :</ul><div className="user_input" ><input type="text" className="mssginput" id="1" name="input" placeholder="Say something"  ></input><TopButton onClick={(y:any)=>{setUser({user_name:(document.getElementById('1') as HTMLInputElement).value})}} src={Vector} s_padding={{padding: '12px 16px'}} /></div> </div></div>
   
    if (status === "0")
        var body = <Home_p setoUser={setoUser} value={users.length - 1} otheruser={otheruser} user={user} _slct={slct} setMssgs={setMssgs} setRoom={setRoom} rooms={rooms} setSlct={setSlct} setStatus={setStatus} />;
    else if (status === "1")
        body = <L_chat otheruser={otheruser} _slct={slct} users={users} user={user} room={room} mssgs={mssgs} setMssg={messageset}  setStatus={setStatus} />
    else if (status === "3")
        body = <Add_room setStatus={setStatus} />
    else
        body = <Search setoUser={setoUser} setRoom={setRoom} rooms={rooms} user={user} setSlct={setSlct} setStatus={setStatus} users={users}  />

    return (
      <>
        {user_p}{body}
      </> 
    )
};

export default Home;
