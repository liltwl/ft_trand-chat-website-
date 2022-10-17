import styled from 'styled-components';
import NavButton from './NavButton';
const Ss = styled.header`
  display: flex;
  align-items: center;
  padding: 35px 50px;
  justify-content: space-between;

h1 {
font-family: 'Space Grotesk';
font-style: normal;
display: inline-block;

weight: 149px;;
height: 32px;
color: #EEEE;
}

li {
  user-select:none;
list-style: none;
font-family: 'Inria Serif';
font-style: normal;
font-weight: 300;
margin-right: 50px;
font-size: 20px;
line-height: 29px;
color: #EEEEEE;
}
`;


const Pright = styled.div`
display: flex;
height: auto;
width: auto;
align-items: center;
justify-content: center;
@media (max-width: 600px){

}

}
`;



const Navbar = () => {
  
  return (
    <Ss>
    <h1>DragonPong</h1>
    <Pright>
    <NavButton type="button" onClick={() => console.log("yoyo")} title="login" />
    </Pright>
    </Ss>
  );
};
  
export default Navbar;