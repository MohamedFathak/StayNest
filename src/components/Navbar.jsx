import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const location = useLocation();

    
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Explore Hotels", path: "/#hotels" },
    ];

    return (
        <header
            className={`sticky top-0 z-50 w-full border-b border-slate-200 transition-all duration-300 ${
                isScrolled
                    ? "bg-white/95 shadow-md backdrop-blur-md"
                    : "bg-white"
            }`}
        >
            <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

                {/* Logo */}
                <Link
                    to="/"
                    className="flex items-center gap-1 text-2xl font-bold tracking-tight"
                >
                    <span className="text-slate-900">Stay</span>
                    <span className="text-blue-600">Nest</span>
                    <span className="ml-1 text-blue-600">.</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-9 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-sm font-semibold text-slate-600 transition hover:text-blue-600"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop Add Hotel Button */}
                <div className="hidden md:block">
                    <Link
                        to="/add-hotel"
                        className="rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                    >
                        + Add Hotel
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMenuOpen}
                >
                    {isMenuOpen ? (
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div className="border-t border-slate-200 bg-white px-6 py-5 shadow-lg md:hidden">
                    <div className="flex flex-col gap-5">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-sm font-semibold text-slate-700 transition hover:text-blue-600"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Link
                            to="/add-hotel"
                            onClick={() => setIsMenuOpen(false)}
                            className="rounded-lg bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                            + Add Hotel
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;


