import React from 'react';
import { useState, createContext} from 'react';
import { AddCafe } from './pages/AddCafe';
import { Routes, Route } from 'react-router';
import { Layout1 } from './layout/Layout1';

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
      <MyContext.Provider value={globalHooks}>
        <Routes>
          <Route path='/' element={<Layout1 />}>
            <Route path='/add_cafe' element={<AddCafe />} />
          </Route>
        </Routes>
      </MyContext.Provider>
      
    </>
  )
}
