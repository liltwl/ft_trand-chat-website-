import { createContext, useContext } from "react";
import {Socket} from 'socket.io-client';

interface contex_type {
    socket:Socket, 
    room: any, 
    setRoom: Function, 
    rooms: any, 
    setRooms:Function, 
    user: any, 
    setUser: Function, 
    users:any, 
    setUsers: Function, 
    setMssgs: Function, 
    mssgs: any, 
    otheruser:any, 
    setoUser:Function,
    setSlct:Function,
    slct:string
}

export const MyGlobalContext = createContext<contex_type>(undefined)
export const useGlobalContext = () => useContext(MyGlobalContext)