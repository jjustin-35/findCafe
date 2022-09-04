import React from 'react';
import { createContext} from 'react';
import { Routes, Route } from 'react-router';

// componants
import { AddCafe } from './pages/AddCafe';
import { Layout1 } from './layout/Layout1';
import { Home } from './pages/Home';
import { Notfound } from './pages/Notfound';
import { Authentication } from './context/AuthProvider';
import { GlobalProvider } from './context/GlobalProvider';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { Forgotpwd } from './pages/Forgotpwd';
import { Find } from './pages/Find';
import { Profile } from './pages/Profile';

export const MyContext = createContext();
export const App = () => {
  return (
    <>
      <GlobalProvider>
        <Routes>
          <Route path='/' element={<Layout1 />}>
            <Route index element={<Home />} />
            <Route path='/profile' element={<Authentication>
              <Profile/>
            </Authentication> } />
            <Route path="/search" element={<Find/>} />
            <Route path='/add_cafe' element={<Authentication>
              <AddCafe/>
            </Authentication>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/forgotpwd" element={<Forgotpwd/>} />
          </Route>
          <Route path='*' element={<Notfound />} />
        </Routes>
      </GlobalProvider>
      
    </>
  )
}
