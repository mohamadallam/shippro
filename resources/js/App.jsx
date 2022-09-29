import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// authCheck
import { authCheck } from "./redux/reducers/auth";
// notistack
import { SnackbarProvider } from "notistack";
// material ThemeProvider
import { ThemeProvider } from "@mui/material/styles";
import Notification from "./components/Notification";
// Layouts
import Layout from "./Layouts";
// routes
import Routes from "./routes";
import theme from "./theme";
import useLoading from "./hooks/useLoading";
import LoadingPage from "./components/LoadingPage";
const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(authCheck(window.location.pathname));
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={4} preventDuplicate>
                <Notification />
                <LoadingPage useLoading={useLoading} />
                <Layout>
                    <Routes />
                </Layout>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
