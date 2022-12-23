import React, { useCallback } from 'react';
import './Home.css'
import Union from '../img/Union.svg'
import Vector from '../img/Vector.svg'
import fill1 from '../img/Fill1.svg'
import axios from 'axios'
import { useState } from 'react';
import DM from './DM/DM'
import './DM/DM.css'
import L_chat from './live_chat/L_chat'
import Search from './search/Search'
import Top_button from './Top_button'
import { useContext, useEffect } from 'react';
import Add_room from './add_room/Add_room'



const Tab = (props) => {
    var t_style = {background: 'none'}
    if (props.selected === true)
        t_style.background = '#004CCC'
    else if (props.selected === false)
        t_style.background = 'none'
    return (
        <>
        <div className="tab_root" title={props.title} type="button" 
        onClick={() => {
            if ((props.selected !== props & !props.selected) || (props.selected === props.slct & !props.selected))
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



const Chat_top_bar = (props) => {
    return (
        <div className="Chat-top-bar">
            <Top_button src={Vector} s_padding={{padding: '12px 16px'}} />
            <div className="add_room" >
                <Top_button title="Add new room" src={fill1} s_padding={{padding: '11px 11px'}} setStatus={()=>props.setStatus("3")}/>
                <Top_button src={Union}  num="259" setStatus={() => props.setStatus("2")}/>
            </div>
        </div>
    );
}



const Home_p = (props) => {
    const handleselect = () => props.setSlct(!props._slct);
    

    if (props._slct === true)
        var swahh = <DM isDM={true} onClick={props.setStatus}  value="Morning Mr Smith, what bends your mind every time you think..."/> ;
    else
        swahh = <DM isRoom={true} setRoom={props.setRoom} setMssgs={props.setMssgs}  rooms={props?.rooms} setStatus={props.setStatus} onClick={props.setStatus}  value="omar, samir ...."/> ;
    return (
    <>
        <Chat_top_bar setStatus={props.setStatus} />
        <div   className="Bars"  >
            <Tab title="DM" selected={props._slct} slct={props._slct} onClick={handleselect}/>
            <Tab title="ROOM" selected={(!props._slct)} slct={props._slct}  onClick={handleselect}/>
        </div>
        {swahh}
    </>
    );
}






const Home = (props) => {
    const socket= props.socket
    const [room, setRoom] = useState({})
    const [mssgs, setMssgs] = useState([])
    const [status, setStatus] = useState("0"); // 0: normal 1: livechat , 2: members, 3: add_room
    const [rooms, setRooms] = useState([]);
    const [slct, setSlct] = useState(true);  // 0 for room and 1 DM
    const [user, setUser] = useState(undefined);
    const [users, setUsers] = useState(undefined);


    const getUser = useCallback(() => {
        return sessionStorage.getItem("user");
    }, []);

    useEffect(() => {
        const user = getUser();
        if(!(JSON.parse(user)?.name)) return;
        setuser(JSON.parse(user));
        console.log(JSON.parse(user))
    },[getUser])

    if (!user?.name)
        var user_p = <div className="user_h"><div className="user_p"><ul>name :</ul><div className="user_input" ><input type="text" className="mssginput" id="1" name="input" placeholder="Say something"  ></input><Top_button onClick={(y)=>{setuser({name:document.getElementById('1').value})}} src={Vector} s_padding={{padding: '12px 16px'}} /></div> </div></div>
    
    const messageset = (message) => {
        // if (message)
        //     setMssgs(mssgs =>[...mssgs, {name: user.name,text: message}]);
        console.log(mssgs)
    };

    const RoomCreated = (Room) =>{
        var tmp = rooms;
        if (!rooms[0])
                getrooms()
        tmp.push(Room);
        console.log(tmp)
        setRooms(tmp);
    }

     

    function getrooms() {
       axios.get('http://localhost:8080/app/rooms').then((data) => setRooms(data.data))
       console.log("fetching data")
   }
    useEffect( () => {
        getrooms();
    }, [status === "0", slct])
    useEffect( () => {
    
        function getusers() {
            axios.get('http://localhost:8080/app/users').then((data) => setUsers(data.data))
        }
        getusers();
    }, [status === "2"])

    useEffect(() => {
        const getMssgs = () =>{
            axios.get('http://localhost:8080/app/mssgs?name='+ room?.name).then((data) => setMssgs(data.data))
        }
        getMssgs();
    },[status === "1"])




    
    useEffect( () => {
        const messageListener =  (message) => {
            var tmp = rooms;
            if (!rooms[0])
                getrooms()
            var room_tmp =  tmp?.find((m) => (m.name === message.name));
            if (room_tmp?.name)
            {
                room_tmp.mssg = message.mssg;
            }
            console.log(message.mssg[0])
            console.log(rooms)
            setRooms(tmp);
            setMssgs(mssgs =>[...mssgs, message.mssg[0]]);
        };
            socket.on('RoomCreated', RoomCreated);
            socket.on('msgToClient', messageListener );
            // socket.on('deleteMessage', deleteMessageListener);
            // socket.emit('getMessages');  `

          return () => {
            socket.off('RoomCreated');
            socket.off('msgToClient', messageListener );

        // socket.off('deleteMessage', deleteMessageListener);
        };
    }, [socket]);

    const setuser = (user) => {
        socket.emit("connection", user.name)
        sessionStorage.setItem("user", JSON.stringify(user));
        setUser(user)
    }
    if (status === "0" && rooms)
        var body = <Home_p  _slct={slct} setMssgs={setMssgs} setRoom={setRoom} rooms={rooms} setSlct={setSlct} setStatus={setStatus} />;
    else if (status === "1")
        body = <L_chat _slct={slct} socket={props.socket} users={users} user={user} room={room} mssgs={mssgs} setMssg={messageset} onClick={setStatus} setStatus={setStatus} />
    else if (status === "3")
        body = <Add_room setStatus={setStatus} socket={socket}/>
    else
        body = <Search setStatus={setStatus} users={users}  />

    return (
      <>
        {user_p}{body}
      </> 
    )
};

export default Home;
