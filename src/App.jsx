import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import HotelForm from "./components/HotelForm";
import HotelDetails from "./pages/HotelDetails";
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
const App = () => {
    return (
        <div className="min-h-screen flex flex-col">

            <ScrollToTop />

            <Navbar />

            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />

                    <Route path="/add-hotel" element={<HotelForm />} />

                    <Route path="/edit-hotel/:id" element={<HotelForm />} />

                    <Route path="/hotel/:id" element={<HotelDetails />} />
                </Routes>
            </main>

            <Footer />

        </div>
    );
};
export default App;


