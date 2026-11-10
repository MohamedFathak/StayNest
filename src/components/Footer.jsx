
import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
    return (
        <footer className="bg-white text-slate-600 border-t border-gray-200 pt-10 px-6 md:px-16 lg:px-24 xl:px-32">

            <div className="flex flex-wrap justify-between gap-12 md:gap-6">

                {/* StayNest Branding */}
                <div className="max-w-80">
                    <Link to="/" className="inline-block mb-3">
                        <h2 className="text-3xl font-bold text-blue-700">
                            StayNest
                        </h2>
                        <p className="text-xs text-gray-500">
                            Find your perfect stay.
                        </p>
                    </Link>

                    <p className="text-sm leading-6">
                        Discover comfortable hotels and peaceful places
                        to stay. Find the perfect accommodation for
                        your next journey with StayNest.
                    </p>

                    <div className="flex items-center gap-3 mt-4">
                        <img src={assets.instagramIcon} alt="Instagram" className="w-6" />
                        <img src={assets.facebookIcon} alt="Facebook" className="w-6" />
                        <img src={assets.twitterIcon} alt="Twitter" className="w-6" />
                        <img src={assets.linkendinIcon} alt="LinkedIn" className="w-6" />
                    </div>
                </div>

                {/* Company */}
                <div>
                    <p className="font-bold text-lg text-slate-800">
                        COMPANY
                    </p>

                    <ul className="mt-3 flex flex-col gap-3 text-sm">
                        <li><Link to="/" className="hover:text-blue-600">Hotels</Link></li>
                        <li><a href="#" className="hover:text-blue-600">About Us</a></li>
                        <li><a href="#" className="hover:text-blue-600">Our Services</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <p className="font-bold text-lg text-slate-800">
                        SUPPORT
                    </p>

                    <ul className="mt-3 flex flex-col gap-3 text-sm">
                        <li><a href="#" className="hover:text-blue-600">Help Center</a></li>
                        <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
                        <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div className="max-w-80">
                    <p className="font-bold text-lg text-slate-800">
                        STAY UPDATED
                    </p>

                    <p className="mt-3 text-sm leading-6">
                        Stay connected with StayNest for hotel updates
                        and useful information.
                    </p>

                    <div className="flex items-center mt-4">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="bg-white rounded-l-lg border border-gray-300 h-10 px-3 outline-none focus:border-blue-500 w-full"
                        />

                        <button
                            type="button"
                            aria-label="Subscribe"
                            className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 h-10 w-11 rounded-r-lg"
                        >
                            <img
                                src={assets.arrowIcon}
                                alt=""
                                className="w-3.5 invert"
                            />
                        </button>
                    </div>
                </div>

            </div>

            {/* Copyright */}
            <hr className="border-gray-200 mt-10" />

            <div className="flex flex-col md:flex-row gap-3 items-center justify-between py-6 text-sm">
                <p>
                    © {new Date().getFullYear()} StayNest. All rights reserved.
                </p>

                <ul className="flex items-center gap-5">
                    <li><a href="#" className="hover:text-blue-600">Privacy</a></li>
                    <li><a href="#" className="hover:text-blue-600">Terms</a></li>
                    <li><a href="#" className="hover:text-blue-600">Sitemap</a></li>
                </ul>
            </div>

        </footer>
    );
};

export default Footer;

