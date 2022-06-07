import React from "react";
import { Navigate, Outlet } from "react-router";

export default function ProtectedRoute({
    account,
    redirectPath = "/auth/login",
    children,
}) {
    if (!account) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
}
