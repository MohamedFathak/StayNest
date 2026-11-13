import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import HotelForm from "./components/HotelForm";
import HotelDetails from "./pages/HotelDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant",
        });
    }, [pathname]);

    return null;
};

const App = () => (
    <div className="min-h-screen flex flex-col">
        <ScrollToTop />

        <Navbar />

        <main className="flex-grow">
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/hotel/:id" element={<HotelDetails />} />

                {/* Admin-only routes */}
                <Route
                    path="/add-hotel"
                    element={
                        <AdminRoute>
                            <HotelForm />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/edit-hotel/:id"
                    element={
                        <AdminRoute>
                            <HotelForm />
                        </AdminRoute>
                    }
                />
            </Routes>
        </main>

        <Footer />
    </div>
);

export default App;



