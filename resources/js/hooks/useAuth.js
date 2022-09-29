import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setRedirect } from "../redux/reducers/auth";
import { useDispatch } from "react-redux";
const mapState = (state) => {
    return {
        ...state.auth,
    };
};
const useAuth = () => {
    const auth = useSelector(mapState);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = Boolean(auth.user);
    useEffect(() => {
        // after login redirect user to redirect page if exist
        if (isAuth && auth.redirect && !auth.autoLoginPending) {
            dispatch(setRedirect(null));
            navigate(auth.redirect);
        }
    }, [auth.autoLoginPending]);

    return { ...auth, isAuth };
};
export default useAuth;
