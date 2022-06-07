import React from "react";
import { Navigate, Outlet } from "react-router";

export default function AdminRoute({
    account,
    role,
    redirectPath='/',
    children,
}) {
    if (!account || role != 'admin') {
        return <Navigate to={redirectPath} replace />;
    }
    return children ? children : <Outlet />;
}
