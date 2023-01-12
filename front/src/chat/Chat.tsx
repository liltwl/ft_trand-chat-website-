import * as React from 'react';
import './Home.css'
import axios from 'axios'
import { useState } from 'react';
import DM from './DM/DM'
import './DM/DM.css'
import Lchat from './live_chat/L_chat'
import Search from './search/Search'
import TopButton from './TopButton'
import { useCallback,useEffect } from 'react';
import Addroom from './add_room/Add_room'
import { MyGlobalContext,useGlobalContext } from './Context'
import User from './interfaces/User'
import Room from './interfaces/Room'
import Mssg from './interfaces/Mssg'


const Vector = require('../img/Vector.svg').default as string;
const Union = require('../img/Union.svg').default as string;
const fill1 = require('../img/Fill1.svg').default as string;


const Tab = (props: any) => {
    var t_style = {background: 'none'}
    if (props.selected === true)
        t_style.background = '#004CCC'
    else
        t_style.background = 'none'
    return (
        <>
        <div className="tab_root" title={props.title}
        onClick={() => {
            // if ((props?.selected !== props && !props?.selected) || (props.selected === props.slct && !props.selected))
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



const ChatTopBar = (props: any) => {
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



const Homep = (props: any) => {
    const { setSlct,slct } = useGlobalContext()


    
    if (props?._slct === "0")
        var swahh = <DM isDM={true} setStatus={props?.setStatus} onClick={props?.setStatus}/> ;
    else
        swahh = <DM isRoom={true}  setStatus={props?.setStatus} onClick={props?.setStatus}/> ;
    return (
    <>
        <ChatTopBar value={props.value} setStatus={props?.setStatus} />
        <div   className="Bars"  >
            <Tab title="DM" selected={slct==="0"} slct={slct} onClick={() => setSlct("0")}/>
            <Tab title="ROOM" selected={slct==="1"} slct={slct}  onClick={() => setSlct("1")}/>
        </div>
        {swahh}
    </>
    );
};












const Chat = (props:any) => {

    const [status, setStatus] = useState<string>(undefined); // 0: normal, 1: livechat , 2: members, 3: add_room
    const [slct, setSlct] = useState<string>();  // 0 :room and 1 DM
    
    const socket = props.socket
    
    const [user, setUser] = useState<User>();
    const [room, setRoom] = useState<Room>();
    const [mssgs, setMssgs] = useState<Mssg[]>([])
    const [rooms, setRooms] = useState<Room[]>([]);
    const [otheruser, setoUser] = useState<User[]>(undefined); 
    const [users, setUsers] = useState<User[]>([]);



    const setuser_tostor = (user1:any) => {
        sessionStorage.setItem("user", JSON.stringify(user1));
    }    
    const setstatus_tostor = (tmp:any) => {
        sessionStorage.setItem("status", JSON.stringify(tmp));
    }    
    const setslct_tostor = (tmp:any) => {
        sessionStorage.setItem("slct", JSON.stringify(tmp));
    }    

    const setroomid_tostor = (tmp:any) => {
        sessionStorage.setItem("room_name", JSON.stringify(tmp));
    }



    const getUser = useCallback(() => {
        return (sessionStorage.getItem("user"));
    }, []);    
    const getstatus = useCallback(() => {
        return sessionStorage.getItem("status");
    }, []);
    const getslct = useCallback(() => {
        return sessionStorage.getItem("slct");
    }, []); 
    const getroom_name = useCallback(() => {
        return JSON.parse(sessionStorage.getItem("room_name"));
    }, []); 




    useEffect(() => {
        console.log("connection")
        const user1 = getUser();
        const status1 = getstatus();
        const slct1 = getslct();

        if((JSON.parse(user1)?.user_name))
        {
            socket.emit("connection", (JSON.parse(user1)?.user_name))
            setUser(JSON.parse(user1));
        }
        if (JSON.parse(status1))    
            setStatus(JSON.parse(status1))
        else
            setStatus("0")
        if (JSON.parse(slct1))  
            setSlct(JSON.parse(slct1))
        else
            setSlct("0")
    },[getUser,getstatus,getslct,socket])      
    
    
    useEffect(()=>{
        if (status)
            setstatus_tostor(status);
        if (slct)    
            setslct_tostor(slct)
        if (room)    
            setroomid_tostor(room?.name)
    }, [status , slct,room])


    useEffect(()=> {
        axios.get('data.json').then((data) => {
            setRooms(data.data.data.rooms); 
            setUsers(data.data.data.users);
            const room_name= getroom_name()
            const tmproom = data.data.data.rooms?.find((m:any)=>m.name === room_name)
            console.log("data :",tmproom,", room name :", room_name)
            if(room_name&&tmproom){
                setRoom(tmproom)
                if (tmproom.isdm)
                setoUser(tmproom.users.find((m:any)=>m.user_name !== JSON.parse(getUser()).user_name))
            }
        })
    } , [getUser,getroom_name])
    
    // handling web socket 







    // { room: props.room?.name,  mssg : { name: props.user?.user_name,text: message}}



    
    const messageListener =  useCallback((message:{room :string, mssg: Mssg}) => {
        const tmp = rooms?.map((m:Room) => {
            if (m.name === message.room)
                return {...m, mssg:[message.mssg]}
            else
                return m
        });
        setRooms(tmp);
        if (room?.name === message.room)
            setMssgs(mssgs =>[...mssgs, message.mssg]);
    }, [rooms, room])

    



    const creatRoom = useCallback((Room:Room) =>{
        setRooms(rooms =>[...rooms, Room]);
        console.log("creatroom:");
    }, [])





    const adduser =  useCallback((data: { room_name:string, user_name: string}) => {

        const tmp = rooms?.map((m) => {
            if (m.name === data.room_name && !m.users.find((us:any)=>us.user_name ===  data.user_name))
                return {...m, users:[...m.users,{user_name : data.user_name}]}
            else
                return m
        });
        setRooms(tmp);
        if (room?.name === data.room_name)
            setRoom(tmp.find((m) => m.name === data.room_name))
    },[room?.name, rooms])




    const addbanned =  useCallback((data: { room_name:string, user_name: string}) => {

        const tmp = rooms?.map((m) => {
            if (m.name === data.room_name && !m.banned.find((us:any)=>us.user_name ===  data.user_name))
               {return {...m, banned:[...m.banned,{user_name : data.user_name}]}}
            else if (m.name === data.room_name && m.banned.find((us:any)=>us.user_name ===  data.user_name))
            {
                return {...m, banned: m.banned.filter((m:any)=> m.user_name !== data.user_name)}
            }
            else
                return m
        });
        setRooms(tmp);
        if (room?.name === data.room_name)
            setRoom(tmp.find((m) => m.name === data.room_name))
        console.log("banned :", tmp)
    }, [room?.name, rooms])




    const deleteuser =  useCallback((data: { room_name:string, user_name: string}) => {

        const tmp = rooms?.map((m) => {
            if (m?.name === data.room_name && m.users.find((us:any)=>us.user_name ===  data.user_name))
            {
                return {...m, users: m.users.filter((m:any)=> m.user_name !== data.user_name)}
            }
            else
                return m
        });
        setRooms(tmp);
        if (room?.name === data.room_name)
            setRoom(tmp.find((m) => m.name === data.room_name))
        console.log("delete :", tmp)
    }, [room?.name, rooms])
    



    const addmuted =  useCallback((data: { room_name:string, user_name: string}) => {

        const tmp = rooms?.map((m) => {
            if (m.name === data.room_name && !m.muted.find((us:any)=>us.user_name ===  data.user_name))
               {return {...m, muted:[...m.muted,{user_name : data.user_name}]}}
            else if (m.name === data.room_name && m.muted.find((us:any)=>us.user_name ===  data.user_name))
            {
                return {...m, muted: m.muted.filter((m:any)=> m.user_name !== data.user_name)}
            }
            else
                return m
        });
        setRooms(tmp);
        if (room?.name === data.room_name)
            setRoom(tmp.find((m) => m.name === data.room_name))
    },[room?.name, rooms])
    




    const addadmin = useCallback((data: { room_name:string, user_name: string}) => {

        const tmp = rooms?.map((m) => {
            if (m.name === data.room_name && !m.admins.find((us:any)=>us.user_name ===  data.user_name))
               {return {...m, admins:[...m.admins,{user_name : data.user_name}]}}
            else if (m.name === data.room_name && m.admins.find((us:any)=>us.user_name ===  data.user_name))
            {
                return {...m, admins: m.admins.filter((m:any)=> m.user_name !== data.user_name)}
            }
            else
                return m
        });
        setRooms(tmp);
        if (room?.name === data.room_name)
            setRoom(tmp.find((m) => m.name === data.room_name))
        console.log("admin :", tmp)
    },[room?.name, rooms])

    



    const deleteroom = useCallback((data: {room_name:string}) => {

        const tmp = rooms?.filter((m) =>  m.name !== data.room_name);
        setRooms(tmp);
        setStatus("0");
        if (room?.name === data.room_name)
            setRoom(tmp.find((m) => m.name === data.room_name))
    },[room?.name, rooms])




    useEffect(()=> {

        socket.on('msgToClient', messageListener );
        socket.on('RoomCreated', creatRoom);
        socket.on('adduserToClient', adduser);
        socket.on('bannedToClient', addbanned);
        socket.on('leaveToClient', deleteuser);
        socket.on('mutedToClient', addmuted);
        socket.on('adminToClient', addadmin);
        socket.on('deleteToClient', deleteroom);

        
        return () => {
            
            socket.off('RoomCreated', creatRoom);
            socket.off('msgToClient', messageListener);;
            socket.off('adduserToClient', adduser);
            socket.off('bannedToClient', addbanned);
            socket.off('leaveToServer', deleteuser);
            socket.off('mutedToClient', addmuted);
            socket.off('adminToClient', addadmin);
            socket.off('deleteToClient', deleteroom);

        };
    }, [messageListener,creatRoom,adduser, addbanned,deleteuser,addmuted,addadmin,socket,deleteroom])

        



    if (!user?.user_name)   //hada how 3lach dayr lfilm
        var user_p = <div className="user_h"><div className="user_p"><ul>name :</ul><div className="user_input" ><input type="text" className="mssginput" id="1" name="input" placeholder="Say something"  ></input><TopButton onClick={(y:any)=>{setUser({user_name:(document.getElementById('1') as HTMLInputElement).value});setuser_tostor({user_name: (document.getElementById('1') as HTMLInputElement).value})}} src={Vector} s_padding={{padding: '12px 16px'}} /></div> </div></div>
   
    if (status === "0")
        var body = <Homep setoUser={setoUser} value={users.length - 1} otheruser={otheruser} user={user} _slct={slct} setMssgs={setMssgs} setRoom={setRoom} rooms={rooms} setSlct={setSlct} setStatus={setStatus} />;
    else if (status === "1")
        body = <Lchat _slct={slct} setStatus={setStatus} />
    else if (status === "3")
        body = <Addroom setStatus={setStatus} />
    else
        body = <Search  setSlct={setSlct} setStatus={setStatus} />

    return (
      <>


      <MyGlobalContext.Provider value={{socket, room, setRoom, rooms, setRooms, user, setUser, users, setUsers, setMssgs, mssgs, otheruser, setoUser,setSlct,slct}}>
        {user_p}{body}
        </MyGlobalContext.Provider>
      </> 
    )
};

export default Chat;
