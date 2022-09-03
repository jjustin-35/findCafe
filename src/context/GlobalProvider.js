import { useState, createContext, useContext, useEffect} from 'react';

const MyContext = createContext();

export const GlobalProvider = ({ children }) => { 
    const apiUrl = process.env.REACT_APP_API_URL2;

    const [err, setErr] = useState(null);
    const [profile, setProfile] = useState(null);
    const [areas, setAreas] = useState([]);
    const [search, setSearch] = useState({});
    const [token, setToken] = useState(false);
    
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

    useEffect(() => {
        const token = localStorage.getItem('token');
        setToken(token);

        let profile = localStorage.getItem('profile');
        profile = JSON.parse(profile);
        setProfile(profile);
    }, [])
    
    const globalHooks = {
        errState: {
            err, setErr
        },
        address: {
            areas, setAreas
        },
        searchState: {
            search, setSearch
        },
        auth: {
            token, setToken
        },
        userInfo: {
            profile, setProfile
        }
    }

    return (
        <MyContext.Provider value={globalHooks}>{children}</MyContext.Provider>
    )
}

export const useGlobal =  () => {
    return useContext(MyContext);
}