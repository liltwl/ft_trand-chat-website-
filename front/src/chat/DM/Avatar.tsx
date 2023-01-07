import * as React from 'react';
import './DM.css'

const Avatar= (props: any) => {
    return (
    <div key={props.key} className="c_avatar">
        <img key={props.key} alt="" src={props.src} />
        <div key={props.key} className="online"/>
    </div>);
}

export default Avatar;