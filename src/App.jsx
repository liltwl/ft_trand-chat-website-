
import React from 'react';
import Navbar from './navbar/Navbar';
import Home from './navbar/Home';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="" element={ <><Navbar />  <Home /> </>} />
      <Route path="/Home" element={<></>} />
    </Routes>
    </BrowserRouter>
    </>
  );
}
  
export default App;