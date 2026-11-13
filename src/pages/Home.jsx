import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet-async";
import {
    fetchHotels,
    deleteHotelFromDatabase,
} from "../redux/slices/hotelSlice";
const Home = () => {
    const dispatch = useDispatch();
    const hotels = useSelector((state) => state.hotels.hotels);
    const loading = useSelector((state) => state.hotels.loading);
    const error = useSelector((state) => state.hotels.error);
    const totalHotels = useSelector((state) => state.hotels.totalHotels);
    const totalPages = useSelector((state) => state.hotels.totalPages);
    const user = useSelector((state) => state.auth.user);
    const isAdmin = user?.role === "admin";
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const hotelsPerPage = 6;
    useEffect(() => {
        dispatch(
            fetchHotels({
                search: searchTerm,
                minPrice,
                maxPrice,
                page: currentPage,
                limit: hotelsPerPage,
            })
        );
    }, [dispatch, searchTerm, minPrice, maxPrice, currentPage]);
    const handlePageChange = (page) => {
        setCurrentPage(page);

        document.getElementById("hotel-results")?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    // Delete hotel - Admin only
    const handleDelete = async (id) => {
        if (!isAdmin) return;

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this hotel?"
        );

        if (!confirmDelete) return;

        try {
            await dispatch(deleteHotelFromDatabase(id)).unwrap();

            window.alert("Hotel deleted successfully!");

            if (hotels.length === 1 && currentPage > 1) {
                setCurrentPage((page) => page - 1);
            } else {
                dispatch(
                    fetchHotels({
                        search: searchTerm,
                        minPrice,
                        maxPrice,
                        page: currentPage,
                        limit: hotelsPerPage,
                    })
                );
            }
        } catch (error) {
            window.alert(
                error || "Unable to delete hotel. Please try again."
            );
        }
    };

    const clearFilters = () => {
        setSearchTerm("");
        setMinPrice("");
        setMaxPrice("");
        setCurrentPage(1);
    };

    return (
        <>
            <Helmet>
                <title>StayNest | Find Your Perfect Hotel</title>
                <meta
                    name="description"
                    content="Explore hotels with StayNest. Search, filter, and discover your perfect stay."
                />
            </Helmet>

            <div className="min-h-screen bg-slate-50">

                {/* Hero Section */}
                <section className="relative overflow-hidden bg-slate-900">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-40"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600')",
                        }}
                    />

                    <div className="relative mx-auto max-w-7xl px-6 py-24 text-center md:py-32">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-blue-300">
                            Welcome to StayNest
                        </p>

                        <h1 className="text-4xl font-bold text-white md:text-6xl">
                            Find Your Perfect Stay
                        </h1>

                        <p className="mx-auto mt-5 max-w-2xl text-base text-slate-200 md:text-lg">
                            Discover comfortable hotels and find the right
                            place for your next stay.
                        </p>

                        <a
                            href="#hotels"
                            className="mt-8 inline-block rounded-full bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
                        >
                            Explore Hotels
                        </a>
                    </div>
                </section>

                {/* Hotel Listing */}
                <section
                    id="hotels"
                    className="mx-auto max-w-7xl px-6 py-16"
                >
                    <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                        <div>
                            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-blue-600">
                                Discover
                            </p>

                            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                                Explore Our Hotels
                            </h2>

                            <p className="mt-3 text-slate-500">
                                Find a hotel that matches your preferences.
                            </p>
                        </div>

                        {/* Add Hotel - Admin only */}
                        {isAdmin && (
                            <Link
                                to="/add-hotel"
                                className="rounded-lg bg-blue-600 px-6 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
                            >
                                + Add Hotel
                            </Link>
                        )}
                    </div>

                    {/* Search and Filters */}
                    <div className="mb-8 grid grid-cols-1 gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-4">

                        <input
                            type="text"
                            placeholder="Search hotel by title..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                        <input
                            type="number"
                            min="0"
                            placeholder="Minimum price (₹)"
                            value={minPrice}
                            onChange={(e) => {
                                setMinPrice(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                        <input
                            type="number"
                            min="0"
                            placeholder="Maximum price (₹)"
                            value={maxPrice}
                            onChange={(e) => {
                                setMaxPrice(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                        />

                        <button
                            onClick={clearFilters}
                            className="rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
                        >
                            Clear Filters
                        </button>
                    </div>

                    {/* Hotel Count */}
                    <div
                        id="hotel-results"
                        className="mb-6 scroll-mt-24 flex items-center justify-between"
                    >
                        <p className="text-sm text-slate-500">
                            Showing {hotels.length} of {totalHotels} hotels
                        </p>
                    </div>

                    {/* Loading */}
                    {loading && (
                        <p className="py-10 text-center text-slate-500">
                            Loading hotels...
                        </p>
                    )}

                    {/* Error */}
                    {!loading && error && (
                        <div className="rounded-xl bg-red-50 p-5 text-center text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Hotel Cards */}
                    {!loading && !error && hotels.length > 0 ? (
                        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
                            {hotels.map((hotel) => (
                                <article
                                    key={hotel.id}
                                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <img
                                        src={
                                            hotel.image ||
                                            "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800"
                                        }
                                        alt={hotel.title}
                                        className="h-56 w-full object-cover"
                                    />

                                    <div className="p-5">
                                        <h3 className="text-xl font-bold text-slate-900">
                                            {hotel.title}
                                        </h3>

                                        <p className="mt-3 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">
                                            {hotel.description}
                                        </p>

                                        <p className="mt-4 text-2xl font-bold text-blue-600">
                                            ₹{Number(hotel.price).toLocaleString("en-IN")}
                                            <span className="ml-1 text-sm font-normal text-slate-500">
                                                / day
                                            </span>
                                        </p>

                                        {/* View Details - Everyone */}
                                        <Link
                                            to={`/hotel/${hotel.id}`}
                                            className="mt-5 block rounded-lg bg-slate-900 px-4 py-3 text-center font-semibold text-white transition hover:bg-slate-800"
                                        >
                                            View Details
                                        </Link>

                                        {/* Edit and Delete - Admin only */}
                                        {isAdmin && (
                                            <div className="mt-3 grid grid-cols-2 gap-3">
                                                <Link
                                                    to={`/edit-hotel/${hotel.id}`}
                                                    className="rounded-lg border border-blue-600 px-4 py-2.5 text-center font-semibold text-blue-600 transition hover:bg-blue-50"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        handleDelete(hotel.id)
                                                    }
                                                    className="rounded-lg border border-red-500 px-4 py-2.5 font-semibold text-red-500 transition hover:bg-red-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        !loading &&
                        !error && (
                            <div className="rounded-2xl border border-slate-200 bg-white py-16 text-center">
                                <h3 className="text-xl font-semibold text-slate-800">
                                    No Hotels Found
                                </h3>

                                <p className="mt-2 text-slate-500">
                                    Try changing your search or price filters.
                                </p>
                            </div>
                        )
                    )}

                    {/* Backend Pagination */}
                    {!loading && !error && totalPages > 1 && (
                        <div className="mt-10 flex items-center justify-center gap-3">

                            <button
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Previous
                            </button>

                            {Array.from(
                                { length: totalPages },
                                (_, index) => index + 1
                            ).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`rounded-lg px-4 py-2 font-semibold ${
                                        currentPage === page
                                            ? "bg-blue-600 text-white"
                                            : "border border-slate-300 text-slate-700 hover:bg-slate-100"
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                                className="rounded-lg border border-slate-300 px-4 py-2 font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Next
                            </button>

                        </div>
                    )}
                </section>

                {/* Why Choose StayNest */}
                <section className="bg-white px-6 py-16">
                    <div className="mx-auto max-w-7xl text-center">
                        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
                            Why StayNest
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-slate-900">
                            A Better Way to Discover Hotels
                        </h2>

                        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">

                            <div className="rounded-2xl bg-slate-50 p-7">
                                <div className="text-3xl">🏨</div>
                                <h3 className="mt-4 font-bold text-slate-900">
                                    Hotel Choices
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Explore different hotels in one place.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-7">
                                <div className="text-3xl">🔎</div>
                                <h3 className="mt-4 font-bold text-slate-900">
                                    Easy Search
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    Find hotels using title and price filters.
                                </p>
                            </div>

                            <div className="rounded-2xl bg-slate-50 p-7">
                                <div className="text-3xl">📍</div>
                                <h3 className="mt-4 font-bold text-slate-900">
                                    Location Details
                                </h3>
                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    View hotel details and map locations.
                                </p>
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        </>
    );
};

export default Home;









