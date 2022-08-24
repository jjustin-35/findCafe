import React from 'react';
import { useState, useEffect, createContext} from 'react';
import { AddCafe } from './pages/AddCafe';
import { Routes, Route } from 'react-router';
import { Layout1 } from './layout/Layout1';
import { Home } from './pages/Home';

export const MyContext = createContext();
export const App = () => {

  const apiUrl = process.env.REACT_APP_API_URL;

  const [err, setErr] = useState({
    boolean: false,
    msg: ''
  });
  const [profile, setProfile] = useState({
    isLogin: false,
    info: {}
  });
  const [areas, setAreas] = useState([]);
  const [search, setSearch] = useState({});

  useEffect(() => {
    (async function getData() {
        let areas = await fetch(`${apiUrl}/data/address`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })

        areas = await areas.json();

        setAreas(areas);
    }());
}, []);

  const globalHooks = {
    errrState: {
      err, setErr
    },
    loginState: {
      profile, setProfile
    },
    address: {
      areas, setAreas
    },
    searchState: {
      search, setSearch
    }
  }

  return (
    <>
      <MyContext.Provider value={globalHooks}>
        <Routes>
          <Route path='/' element={<Layout1 />}>
            <Route path='/' element={<Home/> } />
            <Route path='/add_cafe' element={<AddCafe />} />
          </Route>
        </Routes>
      </MyContext.Provider>
      
    </>
  )
}
