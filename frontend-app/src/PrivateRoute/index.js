import { Navigate } from "react-router-dom";
import useLocalState from "../util/useLocalStorage";
import Login from "../Login/login";
import ajax from "../services/fetchService";
import { useState } from "react";

const PrivateRoute = ({children}) => {
    const [jwt,setJwt] = useLocalState("","jwt");
    const [isLoading,setIsLoading] = useState(true);
    const [isvalid,setIsvalid] = useState(null);

    if(jwt){
    ajax('/api/auth/validate?token='+jwt,"get",jwt).then((isvalid) => {
        setIsvalid(isvalid);
        setIsLoading(false);
       });
    }else{
        return <Navigate to="/login" />;
    }
    return isLoading? <div>Loading...</div> : isvalid === true? (children ): (<Navigate to="/login" />);
    
}

export default PrivateRoute;