import React from 'react';
import Avatar from '../DM/Avatar'
import fill from '../../img/Fill.svg'
import Shape from '../../img/Shape.svg'
import Option from '../../img/Options.svg'
import ava from '../../img/avatar.jpg'
import './sh.css'
import '../Home.css'
import Top_button from '../Top_button'

const S_chat_topbar = (props) => {

    return (
        <div className="Chat-top-bar" s_padding={{padding: '14px 14px'}} >
            <Top_button src={fill} s_padding={{padding: '14px 14px'}} onClick={props.setStatus} />
                <div className="Text_c">
                    <ul className="L_title" style={{align_self: "center"}}>{props.title}</ul>
                </div>
                
            <div className="Select_tab" style={{width :"24px"}}/>
        </div>
    );
}

const User = (props) =>{
    return (
        <div className="user">
            <div className="av_text">
                <Avatar src={ava} />
                <ul className="L_title">{props.name}</ul>
            </div>
            <img src={Option} alt="" />
        </div>
    );
}
const Search = (props)  => {
    if (props?.users)
        var users = props.users.slice(0).reverse().map((user, index) => { if (user?.name) return(<User  name={user.name} user={user}/>)})
    return (
        <>
        <S_chat_topbar setStatus={props.setStatus} title="Participants" />
        <div className="search" >
            <input className="M_input" placeholder="Search" type="text"/> 
        </div>
        <div className="users" >
            {users}
        </div>
        </>
    );
}

export default Search