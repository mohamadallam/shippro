import React from "react";
import useAuth from "../hooks/useAuth";
import DashboardLayout from "./Dashboard";
export default function Index(props) {
    const { isAuth, autoLoginPending } = useAuth();
    if (isAuth && !autoLoginPending) {
        return <DashboardLayout>{props.children}</DashboardLayout>;
    }

    return <>{props.children}</>;
}
