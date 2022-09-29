import React from "react";

// without lazy loading
import SignIn from "../pages/Auth/SignIn";
import Shipments from "../pages/Shipments";
// with lazy loading
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const SignUp = React.lazy(() => import("../pages/Auth/SignUp"));
import { Roles } from "../services/authService";

// Icons
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DashboardIcon from "@mui/icons-material/Dashboard";
const Pages = (Role) => {
    switch (Role) {
        case Roles.USER:
            return [
                {
                    Component: Dashboard,
                    path: "/",
                    name: "Dashboard",
                },
                {
                    Component: Shipments,
                    path: "/shipments",
                    name: "Shipments",
                },
                {
                    navigate: "/",
                },
            ];

        default:
            return [
                {
                    Component: SignIn,
                    path: "/login",
                    name: "SignIn",
                },
                {
                    Component: SignUp,
                    path: "/register",
                    name: "SignUp",
                },
                {
                    navigate: "/login",
                },
            ];
    }
};
export default Pages;
