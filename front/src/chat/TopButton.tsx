
import * as React from 'react';
import './Home.css'

const TopButton = (props:any) => {
    if (props?.onClick)
        var handle_submit = () => {props.onClick("0")}
    if (props?.setStatus)
        handle_submit = () => {props.setStatus("3")}
    if (props?.handleSendMessage)
        handle_submit = props.handleSendMessage
    if (props.num)
        var num = <ul>{props.num}</ul>
    return (
        <>
            <div ref={props?.ref} title={props?.title} className="t-butt" style={props?.style} onClick={handle_submit} >
                <div className="t_icone" style={props.s_padding} >
                    <img src={props.src} alt=""  />
                    {num}
                </div>
            </div>
        </>
    );
}
export default TopButton;