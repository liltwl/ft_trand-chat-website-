import * as React from 'react';
import './DM.css'
import { useGlobalContext} from '../Context'

import Mssg  from './Mssg'
const DM = (props: any) => {
  const { user, rooms,setoUser } = useGlobalContext()
 
    if (rooms)
      var body = rooms.slice(0).map((room : any, index: number) => {

        if(props?.isDM === true && room.isdm === 1){
            if (room?.users[0]?.user_name === user?.user_name)
              var user_tmp = room.users[1]
            else if (room?.users[1]?.user_name === user?.user_name)
              user_tmp = room.users[0]
            if (user_tmp)
            return <Mssg style={{cursor: "pointer"}} setoUser={()=>setoUser(user_tmp)} room={room} key={index.toString()} name={user_tmp?.user_name} mssg={room?.mssg[0]} isDM={props?.isDM} isRoom={props.isRoom} onClick={props?.onClick} />
        }
        else if(props?.isRoom === true && room.isdm === 0)
          return <Mssg style={{cursor: "pointer"}} name={room.name} room={room} key={index.toString()} mssg={room?.mssg[0]} isDM={props?.isDM}  isRoom={props.isRoom}  onClick={props?.onClick} />
        return undefined;
      })
      console.log("DM ", body)
    return (
        <div className="Dm_root" >
          {body}
        </div>
    );
}

export default DM;