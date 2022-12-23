import React from 'react';
import './DM.css'

import Mssg  from './Mssg'
const DM = (props) => {
  if (props?.rooms)
    var body = props.rooms.map((room, index) => <Mssg style={{cursor: "pointer"}} setMssgs={props.setMssgs} setRoom={props.setRoom} room={room} key={index} name={room?.name} mssg={room?.mssg[0]} isDM={props.isDM} isRoom={props.isRoom} onClick={props.onClick} />)
    return (
        <div className="Dm_root">
          {body}
        </div>
    );
}

export default DM;