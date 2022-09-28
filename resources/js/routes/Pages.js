import React from "react";

// components
const Shippment = React.lazy(() => import("../pages/Shippment"));
const Home = React.lazy(() => import("../pages/Home"));
import { Roles } from "../services/authService";

// Pages
const Pages = (Role) => {
    switch (Roles) {
        case Roles.USER === Role:
            return [
                {
                    Component: Shippment,
                    path: "/shippment",
                    name: "Shippment",
                },
                {
                    navigate: "/shippment",
                },
            ];

        default:
            return [
                {
                    Component: Home,
                    path: "/",
                    name: "Home",
                },
                {
                    navigate: "/",
                },
            ];
    }
};
export default Pages;
