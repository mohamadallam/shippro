import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// authCheck
import { authCheck } from "./redux/reducers/auth";
// notistack
import { SnackbarProvider } from "notistack";
// material ThemeProvider
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Notification from "./components/Notification";
// Layouts
import Layout from "./Layouts";
// routes
import Routes from "./routes";
const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(authCheck());
    }, []);
    const theme = createTheme();
    return (
        <SnackbarProvider maxSnack={4} preventDuplicate>
            <ThemeProvider theme={theme}>
                <Layout>
                    <Notification />
                    <Routes />
                </Layout>
            </ThemeProvider>
        </SnackbarProvider>
    );
};

export default App;
