import * as React from 'react';
import './livechat.css'
import fill from '../../img/Arrow.svg'
import TopButton from '../TopButton'
import { useGlobalContext } from '../Context'


const MssgCompos = (props: any) => {
    const { user, room } = useGlobalContext()

    const handle_submit = (e: any) => 
    { 
        if (e.key === 'Enter') 
            props.handleSendMessage(e)
    }
    
    if (room?.muted?.find((m:any)=>m?.user_name === user?.user_name) || (room?.banned[0] && room?.isdm === 1))
        var swaah = <><ul className='title'>sorry, you can't send messages to this channel</ul></>
    else
         swaah  = <><input type="dee" className="mssginput" id='1'  placeholder="Say something" onKeyDown={handle_submit} ></input>
        <TopButton src={fill} s_padding={{padding: '14px 14px'}} handleSendMessage={props?.handleSendMessage}  /></>
    return (<>
        <div className="mssgcompos">
            {swaah}
        </div>
    </>);
}

export default MssgCompos;