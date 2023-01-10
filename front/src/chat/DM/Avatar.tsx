import * as React from 'react';
import './DM.css'

const Avatar= (props: any) => {
    return (
    <div key={props.key} className="c_avatar">
        <img  alt="" src={props.src} />
        <div className="online"/>
    </div>);
}

export default Avatar;