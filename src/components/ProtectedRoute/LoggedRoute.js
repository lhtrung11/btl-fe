import React from "react";
import { Navigate, Outlet } from "react-router";

export default function LoggedRoute({
    account,
    redirectPath='/',
    children,
}) {
    if (!account) {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
}
