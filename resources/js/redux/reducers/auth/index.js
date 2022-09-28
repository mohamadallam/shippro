import { createSlice } from "@reduxjs/toolkit";
import { gqlErrors } from "../../../utils";
import { AuthService, Roles } from "../../../services";
export const initialState = {
    loading: false,
    user: null,
    role: Roles.PUBLIC,
    errors: null,
};

const AuthSlice = createSlice({
    name: "Auth",
    initialState,
    reducers: {
        setLoading: (state, { payload }) => {
            state.loading = payload;
        },
        setAuth: (state, { payload }) => {
            state.user = payload.user;
            state.errors = null;
            state.role = AuthService.role(payload.user);
        },
        setErrors: (state, { payload }) => {
            state.errors = payload;
        },
        setInitialState: (state) => {
            state.user = initialState.user;
            state.errors = initialState.errors;
            state.role = initialState.role;
            state.loading = initialState.loading;
        },
    },
});

const { setLoading, setAuth, setInitialState, setErrors } = AuthSlice.actions;

export const logout = () => {
    return async (dispatch) => {
        try {
            await AuthService.logout();
        } catch (err) {
            // handle errors is not important
            // dispatch(setErrors(gqlErrors(err)));
        } finally {
            dispatch(setInitialState());
        }
    };
};

export const register = ({ email, password, name }) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const { success, user, errors } = await AuthService.register({
                email,
                password,
                name,
            });
            if (!success || errors) {
                dispatch(setErrors(gqlErrors(err)));
                return;
            }
            dispatch(setAuth({ user }));
            return user;
        } catch (err) {
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const login = ({ email, password }) => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const { success, user, errors } = await AuthService.login({
                email,
                password,
            });
            if (!success || errors) {
                dispatch(setErrors(gqlErrors(err)));
                return;
            }
            dispatch(setAuth({ user }));

            return user;
        } catch (err) {
        } finally {
            dispatch(setLoading(false));
        }
    };
};

export const authCheck = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true));
            const user = await AuthService.isAuthenticated();
            if (!user) {
                return;
            }
            dispatch(setAuth({ user }));
            return user;
        } catch (err) {
        } finally {
            dispatch(setLoading(false));
        }
        return null;
    };
};
export default AuthSlice.reducer;
