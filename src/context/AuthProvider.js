import { createContext, useContext, useState } from "react";
import { Outlet } from 'react-router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    return <AuthContext.Provider value={{ token, setToken }}>{ <Outlet/> }</AuthContext.Provider>
}

export const useAuth = () => {
    return useContext(AuthContext);
}