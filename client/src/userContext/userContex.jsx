import { createContext, useContext, useEffect, useState } from "react";
import { loginRequest, registerRequest, detailsRequest, editRequest } from "../api/request";
import ChatContext from "../chatContext/chatContext";


const UserContext = createContext();

export const UserContextProvider = ({children}) => {

    const {memberData, setMemberData} = useContext(ChatContext);
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
       const res = await editRequest(id, editUserOb);
       localStorage.setItem("credentials", JSON.stringify(res.data));
       setSession(JSON.parse(localStorage.getItem("credentials")));
       console.log(memberData);
    }

    return(
        <UserContext.Provider value={{getUserDetails, enterUser, registerContext, editUserContext, setUserDetail, userDetail, setSession, session}}>{children}</UserContext.Provider>
    )
}


export default UserContext;