import React from 'react';
import styled from 'styled-components';
import frame1 from '../img/TEAMpic.svg'
import vector from '../img/Vector 1.svg'

const Root = styled.div`
    display: flex;

    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1300px){
        flex-direction: column-reverse;
    }

    @media screen and (max-width: 750px){
        flex-direction: column;
    }
`;


const Rgt = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    @media (min-width: 1200px){
        img{
            width: 626px;
        background-repeat: no-repeat;
        }
    }

    img{
        width: 726px;
    }
    @media screen and (max-width: 750px){
        img{
            width: 450px;
        }
        order: -1;
    }
}
`;

const Lft = styled.div`
position: relative;
    display: flex;

    height: 793px;
    width: 541px;

    flex-direction: column;
    justify-content: start;
    align-items: start;
    color: white;

    button{
        margin-top: 20px;
        align-self: center;
    }

    .vector{
        position: absolute;
        width: 179px;
        height: 221px;
        left: 357px;
        top: 170px;
    }
    h1{
        margin-top: 95px;
        margin-bottom: 0px;
        width: 534px;
        height: 273px;
        font-family: 'Space Grotesk';
        font-style: normal;
        font-weight: 700;
        font-size: 65px;
        line-height: 77px;
    }

    h2{
        font-family: 'Poppins';
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        line-height: 20px;
        width: 400px;
        height: 48px;
    }
    background-position: center top;
    background-repeat: no-repeat;
    img{
        width: 422px;
        justify-self: start;
    }
    @media screen and (max-width: 750px){
        width: 541px;
        height: 793px;
        background-size: 550px;
        img{
            width: 314px;
            justify-self: end;
        }
    }

    @media (min-width: 1300px){
        button {
            align-self: start;
        }
    }

`;

const Btn = styled.button`
    position: relative;

    width: 264px;
    height: 48px;
    color: white;
    background: linear-gradient(85.76deg, rgba(191, 196, 238, 0.0945738) -105.02%, #C367E6 10.94%, rgba(190, 206, 239, 0) 121.57%);
    border-radius: 5px;
    cursor: pointer;
    border: none;

    font-family: 'Space Grotesk';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 26px;

    &:hover {
        background:#C367E6;
        border-radius: 5px;
        cursor: pointer;

    }
    &:active {
        border-radius:5px;

    }
`;

const Data= styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    margin-top:  150px
`
 
const Number = styled.a`
    width: auto;
    height: 53px;

    font-family: 'Space Grotesk';
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 46px;
    text-align: center;

    color: white;
`

const Name = styled.a`
    width: auto;
    height: 17px;

    font-family: 'Space Grotesk';
    font-style: normal;
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;

    color: #E5E5E5;

`
const Numdata = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
`
const Numberdata = (props) => {


    return (
            <Data>
                <Number>{props.num}</Number>
                <Name>{props.name}</Name>
            </Data>
    );
}

const Home= () => {
    return (
        <Root>
            <Lft>
                <h1>Discover, Play & Challenge Your Friends</h1>
                <img src={vector} className="vector" alt="foo is coming "/>
                <h2>DragonPong support realtime game, chat, group chat channel, ranking system and tournament.</h2>
                <Btn>Discover Now</Btn>
                <Numdata>
                <Numberdata num="10+" name="Game Mode" />
                <Numberdata num="600+" name="Players" />
                <Numberdata num="125" name="Live" />
                </Numdata>
            </Lft>
            <Rgt>
            <img src={frame1}alt="foo is coming " />
            </ Rgt>
        </Root>
    );
}

export default Home;