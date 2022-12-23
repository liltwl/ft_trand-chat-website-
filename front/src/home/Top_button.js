
import React from 'react';
import './Home.css'

const Top_button = (props) => {
    if (props?.onClick)
        var handle_submit = () => {props.onClick("0")}
    if (props?.setStatus)
        var handle_submit = () => {props.setStatus("3")}
    if (props?.handleSendMessage)
        var handle_submit = props.handleSendMessage
    if (props.num)
        var num = <ul>{props.num}</ul>
    return (
        <>
            <div title={props?.title} className="t-butt" type="button" style={props?.style} onClick={handle_submit} >
                <div className="t_icone" style={props.s_padding} >
                    <img src={props.src} alt=""  />
                    {num}
                </div>
            </div>
        </>
    );
}
export default Top_button;