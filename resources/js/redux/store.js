import { configureStore } from "@reduxjs/toolkit";
import rootReducer, { initialState } from "./reducers";

const middleware = (getDefaultMiddleware) => {
    const dev = [];
    const prod = [];
    const middlewares = process.env.NODE_ENV !== "production" ? dev : prod;
    return getDefaultMiddleware().concat(middlewares);
};

const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware,
    preloadedState: initialState,
});

export default store;
