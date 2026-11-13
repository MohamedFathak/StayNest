import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login, clearAuthError } from "../redux/slices/authSlice";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isAuthenticated, loading, error } = useSelector(
        (state) => state.auth
    );
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    useEffect(() => {
        if (isAuthenticated && user) {
            navigate("/", { replace: true });
        }
        return () => {
            dispatch(clearAuthError());
        };
    }, [isAuthenticated, user, navigate, dispatch]);
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(login(formData));
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

                <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
                    Welcome Back
                </h1>

                <p className="mb-8 text-center text-gray-500">
                    Login to your StayNest account
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Email Address
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="mt-6 text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Login;
