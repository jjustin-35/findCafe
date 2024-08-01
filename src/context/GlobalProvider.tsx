import React, { useState, createContext, useContext, useEffect, ReactNode } from 'react';

interface GlobalContextType {
  errState: {
    err: string | null;
    setErr: React.Dispatch<React.SetStateAction<string | null>>;
  };
  address: {
    areas: Area[];
    setAreas: React.Dispatch<React.SetStateAction<Area[]>>;
  };
  searchState: {
    search: SearchState;
    setSearch: React.Dispatch<React.SetStateAction<SearchState>>;
  };
  auth: {
    token: string | false;
    setToken: React.Dispatch<React.SetStateAction<string | false>>;
  };
  userInfo: {
    profile: Profile | null;
    setProfile: React.Dispatch<React.SetStateAction<Profile | null>>;
    newInfo: Partial<Profile>;
    setNewInfo: React.Dispatch<React.SetStateAction<Partial<Profile>>>;
  };
}

interface Area {
  name: string;
  districts: { name: string }[];
}

interface SearchState {
  address?: string;
  [key: string]: string | undefined;
}

interface Profile {
  _id: string;
  address?: string;
  [key: string]: any;
}

const MyContext = createContext<GlobalContextType | undefined>(undefined);

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [err, setErr] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [newInfo, setNewInfo] = useState<Partial<Profile>>({});
  const [areas, setAreas] = useState<Area[]>([]);
  const [search, setSearch] = useState<SearchState>({});
  const [token, setToken] = useState<string | false>(false);

  useEffect(() => {
    (async function getData() {
      try {
        const response = await fetch(`${apiUrl}/data/address`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const areasData: Area[] = await response.json();
        setAreas(areasData);
      } catch (error) {
        console.error('Error fetching areas:', error);
      }
    })();
  }, [apiUrl]);

  useEffect(() => {
    (async () => {
      let storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await fetch(`${apiUrl}/auth/check`, {
            method: 'GET',
            headers: {
              Authorization: storedToken,
              'Content-Type': 'application/json',
            },
          });
          const res = await response.json();

          if (!res.isAuth) {
            localStorage.removeItem('token');
            localStorage.removeItem('profile');
            storedToken = '';
          }
        } catch (err) {
          localStorage.removeItem('token');
          localStorage.removeItem('profile');
          storedToken = '';
        }
      }

      setToken(storedToken || false);

      const storedProfile = localStorage.getItem('profile');
      const parsedProfile: Profile | null = storedProfile ? JSON.parse(storedProfile) : null;
      setProfile(parsedProfile);
      setSearch({ address: parsedProfile?.address });
    })();
  }, [apiUrl]);

  const isEmpty = (obj: object): boolean => {
    return Object.keys(obj).length === 0;
  };

  useEffect(() => {
    if (!isEmpty(newInfo)) {
      (async () => {
        try {
          const res = await fetch(`${apiUrl}/auth/user`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: token ? token : '',
            },
            body: JSON.stringify({ _id: profile?._id, data: newInfo }),
          });
          console.log(res);
        } catch (error) {
          console.error('Error updating user info:', error);
        }
      })();
    }
  }, [newInfo, apiUrl, token, profile]);

  useEffect(() => {
    if (profile && !isEmpty(profile)) {
      localStorage.setItem('profile', JSON.stringify(profile));
    }
  }, [profile]);

  const globalHooks: GlobalContextType = {
    errState: { err, setErr },
    address: { areas, setAreas },
    searchState: { search, setSearch },
    auth: { token, setToken },
    userInfo: { profile, setProfile, newInfo, setNewInfo },
  };

  return <MyContext.Provider value={globalHooks}>{children}</MyContext.Provider>;
};

export const useGlobal = (): GlobalContextType => {
  const context = useContext(MyContext);
  if (context === undefined) {
    throw new Error('useGlobal must be used within a GlobalProvider');
  }
  return context;
};
