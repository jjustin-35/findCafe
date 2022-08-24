import React from 'react';
import { useState, useEffect, createContext} from 'react';
import { Routes, Route } from 'react-router';

// componants
import { AddCafe } from './pages/AddCafe';
import { Layout1 } from './layout/Layout1';
import { Home } from './pages/Home';
import { Notfound } from './pages/Notfound';
import { AuthProvider } from './context/AuthProvider';
import { GlobalProvider } from './context/GlobalProvider';

export const MyContext = createContext();
export const App = () => {
  return (
    <>
      <GlobalProvider>
        <Routes>
          <Route path='/' element={<AuthProvider />}>
            <Route path='/' element={<Layout1 />}>
              <Route path='/' element={<Home />} />
              <Route path='/add_cafe' element={<AddCafe />} />
            </Route>
          </Route>
          <Route path='*' element={<Notfound />} />
        </Routes>
      </GlobalProvider>
      
    </>
  )
}
