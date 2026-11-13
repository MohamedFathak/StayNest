import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
const AdminRoute = ({ children }) => {
    const { user, isAuthenticated } = useSelector(
        (state) => state.auth
    );
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    if (user?.role !== "admin") {
        return (
            <>
                <Helmet>
                    <title>Access Denied | StayNest</title>
                    <meta
                        name="description"
                        content="You do not have permission to access this page."
                    />
                </Helmet>

                <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">

                        <div className="mb-5 text-6xl">
                            <span role="img" aria-label="Access denied">
                                🚫
                            </span>
                        </div>

                        <h1 className="text-3xl font-bold text-red-600">
                            Access Denied
                        </h1>

                        <p className="mt-4 text-slate-600">
                            Sorry! You do not have permission to access
                            this page.
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                            Only administrators can add or edit hotels.
                        </p>

                        <Link
                            to="/"
                            className="mt-7 inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Back to Home
                        </Link>

                    </div>
                </div>
            </>
        );
    }
    return children;
};

export default AdminRoute;
