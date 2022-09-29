import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import Copyright from "../components/Copyright";
import AppBar from "../components/Dashboard/AppBar";

import Drawer from "../components/Dashboard/Drawer";

export default function Layout(props) {
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar />
            <Drawer />

            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Box sx={{ minHeight: "70vh", width: "100%" }}>
                        {props.children}
                    </Box>

                    <Copyright sx={{ pt: 4 }} />
                </Container>
            </Box>
        </Box>
    );
}
