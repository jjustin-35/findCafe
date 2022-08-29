import { useState, createContext, useContext, useEffect} from 'react';

const MyContext = createContext();

export const GlobalProvider = ({ children }) => { 
    const apiUrl = process.env.REACT_APP_API_URL;

    const [err, setErr] = useState(null);
    const [profile, setProfile] = useState(null);
    const [areas, setAreas] = useState([]);
    const [search, setSearch] = useState({});
    const [token, setToken] = useState(true);
    
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
        }
    }

    return (
        <MyContext.Provider value={globalHooks}>{children}</MyContext.Provider>
    )
}

export const useGlobal =  () => {
    return useContext(MyContext);
}