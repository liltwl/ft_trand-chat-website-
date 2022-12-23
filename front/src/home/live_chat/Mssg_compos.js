import React from 'react';
import './livechat.css'
import fill from '../../img/Arrow.svg'
import Top_button from '../Top_button'


const MssgCompos = (props) => {
    const handle_submit = (e) => { if (e.key === 'Enter') 
                                    props.handleSendMessage(e)}
    return (<>
        <div className="mssgcompos">
            <input type="text" className="mssginput" id="1" name="input" placeholder="Say something" onKeyDown={handle_submit} ></input>
            <Top_button src={fill} s_padding={{padding: '14px 14px'}} handleSendMessage={props?.handleSendMessage}  />
        </div>
    </>);
}

export default MssgCompos;