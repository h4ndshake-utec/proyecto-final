import { Outlet } from "react-router-dom";

const ProtectedRoute = ({ children , isAllowed}) => {

    if(isAllowed){
        return children ? children : <Outlet />;
    }
  
};

export default ProtectedRoute;
