import useAuth from "../hooks/useAuth";
import { Routes, Route, Navigate } from "react-router-dom";

import React from "react";
import Pages from "./Pages";
import LoadingPage from "../components/LoadingPage";

export default function Index() {
    const { role, autoLoginPending } = useAuth();

    const routes = () => {
        return Pages(role).map(({ Component, path, ...page }, index) => {
            if (page?.navigate) {
                return (
                    <Route
                        key={index}
                        exact
                        replace={true}
                        path="*"
                        element={<Navigate to={page?.navigate} />}
                    />
                );
            }

            return (
                <Route key={index} path={path} exact element={<Component />} />
            );
        });
    };
    // when the app load at first time catch ll routes (don't navigate to any not matched route),
    // so  only  wait untill auto Login conpleted then set routes allowed for current user
    const catchAllRoutes = (
        <Route
            exact
            replace={true}
            path="*"
            element={<LoadingPage backgroundColor={"rgba(255,255,255,1)"} />}
        />
    );
    return (
        <React.Suspense fallback={<LoadingPage />}>
            <Routes>{autoLoginPending ? catchAllRoutes : routes()} </Routes>
        </React.Suspense>
    );
}
