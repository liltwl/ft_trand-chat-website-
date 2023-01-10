import * as React from 'react';
import './Home.css'
import axios from 'axios'
import { useState } from 'react';
import DM from './DM/DM'
import './DM/DM.css'
import L_chat from './live_chat/L_chat'
import Search from './search/Search'
import TopButton from './TopButton'
import { useCallback,useEffect } from 'react';
import Add_room from './add_room/Add_room'
import { MyGlobalContext,useGlobalContext } from './Context'
import { stat } from 'fs';



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
    const { setSlct,slct } = useGlobalContext()

    if (props?._slct === "0")
        var swahh = <DM isDM={true} setStatus={props?.setStatus} onClick={props?.setStatus}/> ;
    else
        swahh = <DM isRoom={true}  setStatus={props?.setStatus} onClick={props?.setStatus}/> ;
    return (
    <>
        <Chat_top_bar value={props.value} setStatus={props?.setStatus} />
        <div   className="Bars"  >
            <Tab title="DM" selected={slct==="0"} slct={slct} onClick={() => setSlct("0")}/>
            <Tab title="ROOM" selected={slct==="1"} slct={slct}  onClick={() => setSlct("1")}/>
        </div>
        {swahh}
    </>
    );
};






const Home = (props: any) => {

    const [status, setStatus] = useState("0"); // 0: normal, 1: livechat , 2: members, 3: add_room
    const [slct, setSlct] = useState("0") as any;  // 0 :room and 1 DM
    
    
    
    const [user, setUser] = useState() as any;
    const [room, setRoom] = useState() as any;
    const [mssgs, setMssgs] = useState([])
    const [rooms, setRooms] = useState();
    const [otheruser, setoUser] = useState(undefined); 
    const [users, setUsers] = useState([]);



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
        const user1 = getUser();
        const status1 = getstatus();
        const slct1 = getslct();
        if((JSON.parse(user1)?.user_name))
            setUser(JSON.parse(user1));
        console.log("status",JSON.parse(status1))
        if (JSON.parse(status1))    
            setStatus(JSON.parse(status1))
        if (JSON.parse(slct1))    
            setSlct(JSON.parse(slct1))
    },[getUser])      
    
    
    useEffect(()=>{
    if (status)
        setstatus_tostor(status);
    if (slct)    
        setslct_tostor(slct)
    if (room)    
        setroomid_tostor(room?.name)
        }, [status, slct,room])
    
        




    const messageset = (message: any) => {
        if (message)
            setMssgs(mssgs =>[...mssgs, {name: user.user_name,text: message}]);
        console.log(mssgs)
    };
    
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
    } , [])
    
    
    if (!user?.user_name)
        var user_p = <div className="user_h"><div className="user_p"><ul>name :</ul><div className="user_input" ><input type="text" className="mssginput" id="1" name="input" placeholder="Say something"  ></input><TopButton onClick={(y:any)=>{setUser({user_name:(document.getElementById('1') as HTMLInputElement).value});setuser_tostor({user_name: (document.getElementById('1') as HTMLInputElement).value})}} src={Vector} s_padding={{padding: '12px 16px'}} /></div> </div></div>
   
    if (status === "0")
        var body = <Home_p setoUser={setoUser} value={users.length - 1} otheruser={otheruser} user={user} _slct={slct} setMssgs={setMssgs} setRoom={setRoom} rooms={rooms} setSlct={setSlct} setStatus={setStatus} />;
    else if (status === "1")
        body = <L_chat otheruser={otheruser} _slct={slct} users={users} user={user} room={room} mssgs={mssgs} setMssg={messageset}  setStatus={setStatus} />
    else if (status === "3")
        body = <Add_room setStatus={setStatus} />
    else
        body = <Search setoUser={setoUser} user={user} setSlct={setSlct} setStatus={setStatus} users={users}  />

    return (
      <>


      <MyGlobalContext.Provider value={{room, setRoom, rooms, setRooms, user, setUser, users, setUsers, setMssgs, mssgs, otheruser, setoUser,setSlct,slct}}>
        {user_p}{body}
        </MyGlobalContext.Provider>
      </> 
    )
};

export default Home;
