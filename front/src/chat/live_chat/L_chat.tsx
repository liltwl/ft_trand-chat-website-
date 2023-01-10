
import * as React from 'react';
import '../Home.css'
import TopButton from '../TopButton'
import fill from '../../img/Fill.svg'
import opt from '../../img/Options.svg'
import union from '../../img/Union1.svg'
import block from '../../img/block.svg'
import MssgCompos from './Mssg_compos'
import { useState,useRef,useEffect } from 'react';
import Mssg from '../DM/Mssg'
import '../DM/DM.css'
import Search from '../search/Search'
import Room_info from './room_info/Room_info'
import { useGlobalContext } from '../Context'


const Opt = (props:any) => {
    return (
        <>
            <div className='acc' onClick={props?.onClick}>
                 <div  className='optins_icone'>
                    <ul>{props.text}</ul>
                    <img src={props.img} alt='' />
                 </div>
            </div>
        </>
    )
}


const L_chat_topbar = (props:any) => {
    const ref = React.useRef<HTMLInputElement>(null);
    const { user, room } = useGlobalContext()

    const [style, setstyle] = useState({display:"none"});
    const onClickOutside = () => setstyle({display:"none"});



    useEffect(() => {
        const handleClickOutside = (event: any) => {
          if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside();
          }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [ref]);


    if (props?.setStatus)
        var handle_submit =() =>props.setStat("0");
    if (props.Subtitle !== "Room")
        var online = <TopButton src={opt} s_padding={{padding: '9px 9px'}}  onClick={() => {if(style.display === "none") setstyle({display:"flex"}); else setstyle({display:"none"}); }}   />
    else 
        online = <TopButton src={union} onClick={handle_submit} s_padding={{padding: '10px 8.5px'}} />
    return (
        <div className="Chat-top-bar"  >
            <TopButton  src={fill} s_padding={{padding: '14px 14px'}} onClick={props.setStatus}  />
                <div className="Text_c">
                    <ul className="L_title">{props.title}</ul>
                    <ul className="Subtitle">{props.Subtitle}</ul>
                </div>
                <div ref={ref} >
            {online}
            <div id="myDropdown" style={style} className="dropdown-content" >
                <Opt text='Block user' alt='' img={block}  onClick={()=>props?.socket.emit('bannedToServer', {room_name: room.name, user_name: user.user_name}, (m : any)=> console.log(m))}/>
            </div>
            </div>
        </div>
    );
}


const Mssgs = (props:any) => {

        var msssssg = props?.mssgs?.map((mssg:any, index:number) => { if (mssg?.name) return(<Mssg key={index} name={mssg.name} mssg={mssg}/>); return;})
 return (
    <div className="mssgs">
        {msssssg}
    </div>
        );
}

const L_chat = (props:any) => {
    const { user, users, rooms, room, otheruser } = useGlobalContext()
    const [stat, setStat] = useState("1")
    const [is, setis] = useState(0)
    const [pass, setpass] = useState(room?.status === 2?true:false)
    if (is === 0 && room?.status === 2)
    {
        setpass(true)
        setis(1)
    }
    const ref = React.useRef<HTMLInputElement>(null);

    console.log(is);
    const onClickOutside = () => props.setStatus("0");
    const handleSendMessage = (e: Event) => {
        e.preventDefault();
        var message = (document.getElementById('1')as HTMLInputElement).value;
        console.log(message);
        (document.getElementById('1')as HTMLInputElement).value ="";
        props.setMssg(message);
      };

      useEffect(() => {
        const handleClickOutside = (event: any) => {
          if (ref.current && !ref.current.contains(event.target)) {
            onClickOutside();
          }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, [ref]);
      const handle_submit = (e : any) => 
      { 
          if (e.key === 'Enter') 
          if ((document.getElementById('pass')as HTMLInputElement).value === room?.passw) 
            setpass(false)
      }
      
      if (pass === true)
        var passw = <div className="user_h" ><div className="user_p" ref={ref}><ul>password:</ul><div className="user_input" ><input type="password" className="mssginput" id="pass" name="input" placeholder="Say something" onKeyDown={handle_submit} ></input><TopButton onClick={()=>{if ((document.getElementById('pass')as HTMLInputElement).value === room?.passw) setpass(false)}}  s_padding={{padding: '12px 16px'}} /></div> </div></div>

    if (props._slct === "0")
        var selected = <L_chat_topbar  title={otheruser?.user_name} Subtitle="Direct Messege" setStatus={props.setStatus} />;
    else
        selected = <L_chat_topbar  title={room?.name} Subtitle="Room" setStatus={props.setStatus}  setStat={setStat} />

    if (stat === "0")
      var body = <Room_info  setStat={setStat} stat={stat} setStatus={props.setStatus} />
    else if (stat === "1")
      body = <>{selected}<Mssgs mssgs={room?.mssg} /><MssgCompos  add_banned_list={props.add_banned_list} handleSendMessage={handleSendMessage} /></>
    else
      body = <Search setStatus={setStat} room_users={room?.users} adduser={true} />
    return (
        <>{passw}
        { body}</>
    );
}

export default L_chat;