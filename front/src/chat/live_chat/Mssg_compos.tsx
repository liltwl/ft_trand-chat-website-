import * as React from 'react';
import './livechat.css'
import fill from '../../img/Arrow.svg'
import TopButton from '../TopButton'


const MssgCompos = (props: any) => {
    const handle_submit = (e : any) => 
    { 
        if (e.key === 'Enter') 
            props.handleSendMessage(e)
    }
    
    if (props?.room?.banned.find((m:any)=>m?.user_name === props?.user?.user_name) || (props?.room.banned[0] && props?.room.isdm === 1))
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