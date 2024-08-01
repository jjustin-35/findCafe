import React, { useState, createContext, useContext, useEffect } from 'react';
import { node } from 'prop-types';

// @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
const MyContext = createContext();

export const GlobalProvider = ({
  children
}: any) => {
  // @ts-expect-error TS(2580): Cannot find name 'process'. Do you need to install... Remove this comment to see the full error message
  const apiUrl = process.env.REACT_APP_API_URL;

  const [err, setErr] = useState(null);
  const [profile, setProfile] = useState(null);
  const [newInfo, setNewInfo] = useState({});
  const [areas, setAreas] = useState([]);
  const [search, setSearch] = useState({});
  const [token, setToken] = useState(false);

  useEffect(() => {
    (async function getData() {
      let areas = await fetch(`${apiUrl}/data/address`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      areas = await areas.json();

      // @ts-expect-error TS(2345): Argument of type 'Response' is not assignable to p... Remove this comment to see the full error message
      setAreas(areas);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let token = localStorage.getItem('token');
      if (token) {
        try {
          let res = await fetch(apiUrl + '/auth/check', {
            method: 'GET',
            headers: {
              Authorization: token,
              'Content-Type': 'application/json',
            },
          });
          res = await res.json();

          // @ts-expect-error TS(2339): Property 'isAuth' does not exist on type 'Response... Remove this comment to see the full error message
          if (!res.isAuth) {
            localStorage.removeItem('token');
            localStorage.removeItem('profile');
            token = '';
          }
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('profile');
          token = '';
        }
      }

      // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
      setToken(token);

      let profile = localStorage.getItem('profile');
      // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
      profile = JSON.parse(profile);
      if (!profile) {
        // @ts-expect-error TS(2322): Type '{}' is not assignable to type 'string'.
        profile = {};
      }
      // @ts-expect-error TS(2345): Argument of type 'string | null' is not assignable... Remove this comment to see the full error message
      setProfile(profile);
      // @ts-expect-error TS(2339): Property 'address' does not exist on type 'string'... Remove this comment to see the full error message
      setSearch({ address: profile?.address });
    })();
  }, []);

  const isEmpty = (obj: any) => {
    for (let i in obj) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    if (!isEmpty(newInfo)) {
      (async () => {
        const res = await fetch(`${apiUrl}/auth/user`, {
          method: 'PATCH',
          // @ts-expect-error TS(2322): Type '{ 'Content-Type': string; Authorization: boo... Remove this comment to see the full error message
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          body: JSON.stringify({ _id: profile._id, data: newInfo }),
        });

        console.log(res);
      })();
    }
  }, [newInfo]);

  useEffect(() => {
    if (!isEmpty(profile)) {
      localStorage.setItem('profile', JSON.stringify(profile));
    }
  }, [profile]);

  const globalHooks = {
    errState: {
      err,
      setErr,
    },
    address: {
      areas,
      setAreas,
    },
    searchState: {
      search,
      setSearch,
    },
    auth: {
      token,
      setToken,
    },
    userInfo: {
      profile,
      setProfile,
      newInfo,
      setNewInfo,
    },
  };

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <MyContext.Provider value={globalHooks}>{children}</MyContext.Provider>;
};

export const useGlobal = () => {
  return useContext(MyContext);
};

GlobalProvider.propTypes = {
  children: node.isRequired,
};
