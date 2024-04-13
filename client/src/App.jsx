// import { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


import Registr from "./component/pages/Register";
import Login from "./component/pages/login";
import Index from "./component/pages/Index";
import Profile from "./component/pages/Profile";

function App() {

  return (
    <BrowserRouter>
    <Routes>
     <Route path='/register' element={<Registr/>} ></Route>
     <Route path='/login' element={<Login/>} ></Route>
     <Route path='/index' element={<Index/>} ></Route>
     <Route path='/Profile' element={<Profile/>} ></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
