import {useContext} from "react";
import { Outlet } from 'react-router';
import { Navigate } from "react-router";
import { useGlobal } from "./GlobalProvider";

export const Authentication = ({children}) => {
    const { token } = useGlobal().auth;
    if (token) {
        return (
            <>
                {children}
            </>
        )
    } else {
        return <Navigate to={'/'} replace={true} />
    }
}