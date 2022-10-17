import React from 'react';
import styled from 'styled-components';



const Pw3 = styled.button`
position: relative;
width: 110px;
height: 37px;
color: white;
background: linear-gradient(85.76deg, rgba(191, 196, 238, 0.0945738) -105.02%, #C367E6 10.94%, rgba(190, 206, 239, 0) 121.57%);
border-radius: 5px;
border: none;


font-family: 'Space Grotesk';
font-style: normal;
font-weight: 700;
font-size: 15px;
line-height: 19px;
text-align: center;

&:hover {
background:#C367E6;
border-radius: 5px;
cursor: pointer;

}
&:active {
    border-radius:5px;

}
`;


const NavButton = (props) => {
    return (

            <Pw3 onClick={props.onClick}>
                {props.title}
            </Pw3>

    );
}
// 
export default NavButton;
