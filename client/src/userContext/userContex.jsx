import { createContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, detailsRequest, editRequest } from "../api/request";


const UserContext = createContext();

export const UserContextProvider = ({children}) => {

   
    const [userDetail, setUserDetail] = useState([]);
    const [session, setSession] = useState([]);

    useEffect(() => {
        setSession(JSON.parse(localStorage.getItem("credentials")));
    }, []);

    const getUserDetails = async (id) => {
        const res = await detailsRequest(id);
        setUserDetail(res.data);
    }

    const enterUser = async (email, password) => {
        const res = await loginRequest(email, password);
        setUserDetail(res.data);
        localStorage.setItem("credentials", JSON.stringify(res.data));
        setSession(JSON.parse(localStorage.getItem("credentials")));
        return 1;
    }

    const registerContext = async (userRegister) => {
        await registerRequest(userRegister);
    }

    const editUserContext = async (id, editUserOb) => {
        console.log(id);
        await editRequest(id, editUserOb);
    }

    return(
        <UserContext.Provider value={{getUserDetails, enterUser, registerContext, editUserContext, setUserDetail, userDetail, setSession, session}}>{children}</UserContext.Provider>
    )
}


export default UserContext;