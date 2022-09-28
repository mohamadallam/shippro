import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import isString from "../utils/isString";
const mapState = (state) => {
    return {
        ...state.auth,
    };
};
const useAuth = (props) => {
    const auth = useSelector(mapState);
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.user && isString(props?.redirect)) {
            navigate(props?.redirect);
        }
    }, [auth.user]);

    return auth;
};
export default useAuth;
