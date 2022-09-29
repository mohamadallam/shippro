import { createSlice } from "@reduxjs/toolkit";
import { AuthService, Roles } from "../../../services";
import { Push } from "../notify";

export const initialState = {
    loading: false,
    user: null,
    role: Roles.PUBLIC,
    errors: null,
    autoLoginPending: true,
    redirect: null,
};

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload;
            return state;
        },
        setAuth: (state, { payload }) => {
            state.user = payload.user;
            state.errors = null;
            state.role = AuthService.role(payload.user);
            return state;
        },
        setAutoLoginPending: (state, { payload }) => {
            state.autoLoginPending = payload;
            return state;
        },
        setErrors: (state, { payload }) => {
            state.errors = payload;
            return state;
        },
        Logout: (state) => {
            state.user = initialState.user;
            state.errors = initialState.errors;
            state.role = initialState.role;
            state.loading = initialState.loading;
            return state;
        },
        setRedirect: (state, { payload }) => {
            state.redirect = payload;
            return state;
        },
    },
});

export const {
    setLoading,
    setAuth,
    Logout,
    setErrors,
    setAutoLoginPending,
    setRedirect,
} = AuthSlice.actions;

export const logout = () => {
    return async (dispatch) => {
        try {
            await AuthService.logout();
        } catch (err) {
            // handle errors is not important
            // dispatch(setErrors(errors));
        } finally {
            dispatch(
                Push({
                    message: "Logout successfully.",
                    variant: "success",
                })
            );
            dispatch(Logout());
        }
    };
};

export const register = ({ email, password, name }) => {
    return async (dispatch) => {
        let u = null;
        try {
            dispatch(setLoading(true));
            const { success, user, errors } = await AuthService.register({
                email,
                password,
                name,
            });
            if (success && !errors) {
                dispatch(setAuth({ user }));
                u = user;
            }
        } catch (err) {
        } finally {
            dispatch(setLoading(false));
        }
        return u;
    };
};

export const login = ({ email, password }) => {
    return async (dispatch) => {
        let u = null;
        try {
            dispatch(setLoading(true));
            const { success, user, errors } = await AuthService.login({
                email,
                password,
            });
            if (success && !errors) {
                dispatch(setAuth({ user }));
                u = user;
            }
        } catch (err) {
        } finally {
            dispatch(setLoading(false));
        }
        return u;
    };
};

export const authLogin = (redirect) => {
    return async (dispatch) => {
        let user = null;
        try {
            dispatch(setLoading(true));
            user = await AuthService.authLogin();
            if (user) {
                dispatch(setAuth({ user }));
            }
        } catch (err) {
        } finally {
            dispatch(setLoading(false));
            dispatch(setAutoLoginPending(false));
            dispatch(setRedirect(redirect));
        }
        return user;
    };
};
export default AuthSlice.reducer;
