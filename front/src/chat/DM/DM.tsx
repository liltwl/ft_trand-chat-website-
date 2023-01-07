import * as React from 'react';
import './DM.css'

import Mssg  from './Mssg'
const DM = (props: any) => {
 

  if (props?.rooms)
    var body = props?.rooms.map((room : any, index: number) => {

        if(props?.isDM && room.isdm === 1){
            if (room.users[0].user_name === props?.user?.user_name)
              var user = room.users[1]
            else if (room.users[1].user_name === props?.user?.user_name)
              user = room.users[0]
            else
                return;
            return <Mssg style={{cursor: "pointer"}}  setoUser={()=>props?.setoUser(user)} setMssgs={props?.setMssgs} setRoom={props?.setRoom} room={room} key={index} name={user.user_name} mssg={room?.mssg[0]} isDM={props?.isDM} isRoom={props?.isRoom} onClick={props?.onClick} />
        }
        else if(props?.isRoom === true && room.isdm === 0)
          return <Mssg style={{cursor: "pointer"}} setRoom={props?.setRoom} name={room.name} room={room} key={index} mssg={room?.mssg[0]} isDM={props?.isDM} isRoom={props?.isRoom} onClick={props?.onClick} />
      })


    return (
        <div className="Dm_root">
          {body}
        </div>
    );
}

export default DM;