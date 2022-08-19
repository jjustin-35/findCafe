import React from 'react';
import { useState, createContext} from 'react';
import { AddCafe } from './pages/AddCafe';
import { Navbar } from './components/Nav';
import { Routes, Route } from 'react-router';

export const MyContext = createContext();
export const App = () => {

  const [err, setErr] = useState({
    boolean: false,
    msg: ''
  });
  const [profile, setProfile] = useState({
    isLogin: false,
    info: {}
  });

  const globalHooks = {
    errrState: {
      err, setErr
    },
    loginState: {
      profile, setProfile
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <MyContext.Provider value={globalHooks}>
        <Routes>
          <Route path='/add_cafe' element={<AddCafe /> } />
        </Routes>
      </MyContext.Provider>
      
    </>
  )
}
