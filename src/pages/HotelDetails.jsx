

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    fetchHotelById,
    clearSelectedHotel,
} from "../redux/slices/hotelSlice";

const HotelDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const hotel = useSelector((state) =>
        state.hotels.hotels.find(
            (item) => String(item.id) === id
        )
    );

    const selectedHotel = useSelector(
        (state) => state.hotels.selectedHotel
    );

    const detailLoading = useSelector(
        (state) => state.hotels.detailLoading
    );

    const detailError = useSelector(
        (state) => state.hotels.detailError
    );

    const currentHotel =
        hotel || (selectedHotel?.id === Number(id) ? selectedHotel : null);

    useEffect(() => {
        dispatch(clearSelectedHotel());

        dispatch(fetchHotelById(id));

        return () => {
            dispatch(clearSelectedHotel());
        };
    }, [dispatch, id]);

    if (detailLoading && !currentHotel) {
        return (
            <div className="min-h-screen bg-slate-50 pt-32 text-center">
                <p className="text-slate-500">Loading hotel details...</p>
            </div>
        );
    }

    if (detailError || (!currentHotel && !detailLoading)) {
        return (
            <>
                <Helmet>
                    <title>Hotel Not Found | StayNest</title>
                    <meta
                        name="description"
                        content="The requested hotel could not be found on StayNest."
                    />
                </Helmet>

                <div className="min-h-screen bg-gray-50 pt-32 text-center px-4">
                    <h1 className="text-3xl font-bold text-slate-800">
                        Hotel Not Found
                    </h1>

                    <p className="mt-3 text-gray-500">
                        The hotel you are looking for does not exist.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        Back to Hotels
                    </button>
                </div>
            </>
        );
    }

    if (!currentHotel) return null;

    const mapUrl = `https://www.google.com/maps?q=${currentHotel.latitude},${currentHotel.longitude}&output=embed`;

    const hotelDescription =
        `${currentHotel.description} View hotel prices and location on StayNest.`;

    const hotelImage =
        currentHotel.image ||
        `https://placehold.co/1200x500?text=${encodeURIComponent(currentHotel.title)}`;

    const canonicalUrl =
        `${window.location.origin}/hotel/${currentHotel.id}`;

    return (
        <>
            <Helmet>
                <title>{`${currentHotel.title} | StayNest`}</title>

                <meta
                    name="description"
                    content={hotelDescription}
                />

                <meta
                    property="og:title"
                    content={`${currentHotel.title} | StayNest`}
                />

                <meta
                    property="og:description"
                    content={currentHotel.description}
                />

                <meta
                    property="og:image"
                    content={hotelImage}
                />

                <meta
                    property="og:type"
                    content="website"
                />

                <link
                    rel="canonical"
                    href={canonicalUrl}
                />
            </Helmet>

            <div className="min-h-screen bg-slate-50 pt-28 pb-12 px-4 md:px-10">
                <div className="max-w-6xl mx-auto">

                    <button
                        onClick={() => navigate("/")}
                        className="mb-6 text-blue-600 font-semibold hover:text-blue-800"
                    >
                        ← Back to Hotels
                    </button>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

                        <div className="w-full bg-gray-100 overflow-hidden">
                            <img
                                src={hotelImage}
                                alt={`${currentHotel.title} hotel`}
                                className="w-full h-auto block object-contain"
                            />
                        </div>

                        <div className="p-6 md:p-8">

                            <div className="flex flex-col md:flex-row justify-between gap-4">

                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                                        {currentHotel.title}
                                    </h1>

                                    <p className="text-gray-500 mt-4 leading-7">
                                        {currentHotel.description}
                                    </p>
                                </div>

                                <div className="md:text-right">
                                    <p className="text-sm text-gray-500">
                                        Price per day
                                    </p>

                                    <p className="text-3xl font-bold text-blue-600 mt-2">
                                        ₹{Number(currentHotel.price).toLocaleString("en-IN")}
                                    </p>
                                </div>

                            </div>

                            <div className="mt-8 border-t border-gray-200 pt-6">

                                <h2 className="text-2xl font-bold text-slate-800 mb-5">
                                    Hotel Location
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">

                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">
                                            Latitude
                                        </p>

                                        <p className="font-semibold text-slate-800 mt-1">
                                            {currentHotel.latitude}
                                        </p>
                                    </div>

                                    <div className="bg-slate-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-500">
                                            Longitude
                                        </p>

                                        <p className="font-semibold text-slate-800 mt-1">
                                            {currentHotel.longitude}
                                        </p>
                                    </div>

                                </div>

                                <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden border border-gray-200">
                                    <iframe
                                        title={`${currentHotel.title} location map`}
                                        src={mapUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        allowFullScreen
                                    />
                                </div>

                                <a
                                    href={`https://www.google.com/maps?q=${currentHotel.latitude},${currentHotel.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block mt-4 text-blue-600 font-semibold hover:underline"
                                >
                                    Open location in Google Maps →
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HotelDetails;




