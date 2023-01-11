
import * as React from 'react';
import '../Home.css'
import TopButton from '../TopButton'
import fill from '../../img/Fill.svg'
import opt from '../../img/Options.svg'
import union from '../../img/Union1.svg'
import block from '../../img/block.svg'
import MssgCompos from './Mssg_compos'
import { useState, useEffect} from 'react';
import Mssg from '../DM/Mssg'
import '../DM/DM.css'
import Search from '../search/Search'
import Roominfo from './room_info/Room_info'
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


const LChatTopbar = (props:any) => {
    const ref = React.useRef<HTMLInputElement>(null);
    const { room, socket } = useGlobalContext()

    const [style, setstyle] = useState({display:"none"});
    const onClickOutside = () =>{ setstyle({display:"none"});}



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
                <Opt text={ !room?.banned?.find((m:any)=>m.user_name===props?.otheruser?.user_name)?'Block user':'unblock user'} alt='' img={block}  onClick={()=>socket.emit('bannedToServer', {room_name: room.name, user_name: props.otheruser.user_name}, (m : any)=> console.log(m))}/>
            </div>
            </div>
        </div>
    );
}


const Mssgs = (props:any) => {


  return (
    <div className="mssgs">
        {props?.mssgs && props?.mssgs.slice(0).reverse().map((mssg:any, index:number) => { if (mssg?.name) return(<Mssg key={index} name={mssg.name} mssg={mssg}/>); return undefined;})}
    </div>
        );
}

function useComponentVisible(setstatus: any) {
  const ref = React.useRef<HTMLInputElement>(null);

  const handleClickOutside = (event:any) => {
      if (ref.current && !ref.current.contains(event.target)) {
          setstatus('0')
      }
  };

  useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
          document.removeEventListener('click', handleClickOutside, true);
      };
  });

  return { ref };
}

const Lchat = (props:any) => {
    const { room, otheruser, mssgs, socket} = useGlobalContext()
    const [stat, setStat] = useState("1")
    const [is, setis] = useState(0)
    const [pass, setpass] = useState(room?.status === 2?true:false)

    if (is === 0 && room?.status === 2)
    {
        setpass(true)
        setis(1)
    }


    const { ref } = useComponentVisible(props?.setStatus);
    
    
    const handleSendMessage = (e: Event) => {
      e.preventDefault();
      var message = (document.getElementById('1') as HTMLInputElement).value;
      if (message.split(" ")[0])
        socket.emit('msgToServer', {
            room: props.room.name,
            mssg : {
            name: props.user?.user_name,
            text: message}
          });
      (document.getElementById('1') as HTMLInputElement).value ="";
    };
    
      const handle_submit = (e : any) => 
      { 
          if (e.key === 'Enter') 
            if ((document.getElementById('pass')as HTMLInputElement).value === room?.passw) 
              setpass(false)
      }
      
      // if (pass === true)
        var passw = <div className="user_h" ><div className="user_p" ref={ref} ><ul>password:</ul><div className="user_input" ><input type="password" className="mssginput" id="pass" name="input" placeholder="Say something" onKeyDown={handle_submit} ></input><TopButton onClick={()=>{if ((document.getElementById('pass')as HTMLInputElement).value === room?.passw) setpass(false)}}  s_padding={{padding: '12px 16px'}} /></div> </div></div>

    if (props._slct === "0")
        var selected = <LChatTopbar otheruser={props?.otheruser} title={otheruser?.user_name} Subtitle="Direct Messege"  setStatus={props.setStatus} />;
    else
        selected = <LChatTopbar  title={room?.name} Subtitle="Room" setStatus={props.setStatus}  setStat={setStat} />

    if (stat === "0")
      var body = <Roominfo  setStat={setStat} stat={stat} setStatus={props.setStatus} />
    else if (stat === "1")
      body = <>{selected}<Mssgs  mssgs={mssgs} /><MssgCompos  add_banned_list={props.add_banned_list} handleSendMessage={handleSendMessage} /></>
    else
      body = <Search setStatus={setStat} room_users={room?.users} adduser={true} />
    return (
        <>{pass && passw}
        { body}</>
    );
}

export default Lchat;