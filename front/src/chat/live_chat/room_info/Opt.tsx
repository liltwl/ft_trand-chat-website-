import * as React from 'react';
import '../../search/sh.css'
import '../../Home.css'
import "./room_info.css"
import "../../add_room/Add_room.css"

const Opt = (props: any) => {
    return (
        <>
            <div className='acc' onClick={props?.onClick}>
                 <div  className='optins_icone'>
                    <ul style={props?.style}>{props.text}</ul>
                    {props?.img && <img src={props?.img} alt='' />}
                 </div>
            </div>
        </>
    )
}

export default Opt;