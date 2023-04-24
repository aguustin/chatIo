import { useNavigate } from "react-router-dom";
import UserContext from "../../userContext/userContex";
import { useContext } from "react";

const SignOut = () => {

    const {setUserDetail, setSession, session} = useContext(UserContext);
    console.log(session);
    const navigate = useNavigate();
    setUserDetail([]);
    localStorage.clear();
    setSession([]);

    navigate("/");

}

export default SignOut;