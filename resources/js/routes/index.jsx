import useAuth from "../hooks/useAuth";
import { Routes, Route, Navigate } from "react-router-dom";
import React from "react";
import Pages from "./Pages";
import LoadingPage from "../components/LoadingPage";
export default function index() {
    const { role } = useAuth();
    const routes = () => {
        return Pages(role).map(({ Component, path, ...page }) => {
            if (page?.navigate) {
                return (
                    <Route render={() => <Navigate to={page?.navigate} />} />
                );
            }
            return <Route path={path} exact element={<Component />} />;
        });
    };
    return (
        <React.Suspense fallback={<LoadingPage />}>
            <Routes>{routes}</Routes>
        </React.Suspense>
    );
}
