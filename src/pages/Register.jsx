
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
    register,
    clearAuthError,
} from "../redux/slices/authSlice";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        return () => {
            dispatch(clearAuthError());
        };
    }, [dispatch]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSuccessMessage("");

        try {
            await dispatch(register(formData)).unwrap();

            setSuccessMessage("Registration successful! Please login.");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error) {
            // The Redux slice stores the registration error.
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg">

                <h1 className="mb-2 text-center text-3xl font-bold text-gray-800">
                    Create Account
                </h1>

                <p className="mb-8 text-center text-gray-500">
                    Join StayNest today
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="mb-2 block font-medium text-gray-700">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

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
                            placeholder="Create a password"
                            required
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500"
                        />
                    </div>

                    {error && (
                        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                            {error}
                        </p>
                    )}

                    {successMessage && (
                        <p className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
                            {successMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

                <p className="mt-6 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};

export default Register;
