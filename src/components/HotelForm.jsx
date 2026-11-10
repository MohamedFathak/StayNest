import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
    addHotelToDatabase,
    updateHotelInDatabase,
    fetchHotels,
} from "../redux/slices/hotelSlice";
const HotelForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const hotels = useSelector((state) => state.hotels.hotels);
    const loading = useSelector((state) => state.hotels.loading);

    const existingHotel = id
        ? hotels.find((hotel) => String(hotel.id) === id)
        : null;
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState("");
    const [error, setError] = useState("");
    useEffect(() => {
        if (id && existingHotel) {
            setTitle(existingHotel.title || "");
            setDescription(existingHotel.description || "");
            setPrice(String(existingHotel.price ?? ""));
            setLatitude(String(existingHotel.latitude ?? ""));
            setLongitude(String(existingHotel.longitude ?? ""));
            setPreview(existingHotel.image || "");
        }
    }, [id, existingHotel]);
    useEffect(() => {
        if (id && !existingHotel) {
            dispatch(fetchHotels({ limit: 100 }));
        }
    }, [id, existingHotel, dispatch]);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            e.target.value = "";
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            setError("Image size must be less than 2 MB.");
            e.target.value = "";
            return;
        }
        setError("");
        setImageFile(file);

        const imagePreview = URL.createObjectURL(file);
        setPreview(imagePreview);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const numericPrice = Number(price);
        const numericLatitude = Number(latitude);
        const numericLongitude = Number(longitude);

        if (!title.trim()) {
            setError("Please enter the hotel name.");
            return;
        }

        if (!description.trim()) {
            setError("Please enter the hotel description.");
            return;
        }

        if (
            price.trim() === "" ||
            !Number.isFinite(numericPrice) ||
            numericPrice <= 0
        ) {
            setError("Please enter a valid price greater than zero.");
            return;
        }

        if (
            latitude.trim() === "" ||
            !Number.isFinite(numericLatitude) ||
            numericLatitude < -90 ||
            numericLatitude > 90
        ) {
            setError("Latitude must be between -90 and 90.");
            return;
        }

        if (
            longitude.trim() === "" ||
            !Number.isFinite(numericLongitude) ||
            numericLongitude < -180 ||
            numericLongitude > 180
        ) {
            setError("Longitude must be between -180 and 180.");
            return;
        }

        const formData = new FormData();

        formData.append("title", title.trim());
        formData.append("description", description.trim());
        formData.append("price", numericPrice);
        formData.append("latitude", numericLatitude);
        formData.append("longitude", numericLongitude);

        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            if (id && existingHotel) {
                await dispatch(
                    updateHotelInDatabase({
                        id: existingHotel.id,
                        formData,
                    })
                ).unwrap();

                window.alert("Hotel updated successfully!");
            } else {
                await dispatch(addHotelToDatabase(formData)).unwrap();

                window.alert("Hotel added successfully!");
            }

            navigate("/");
        } catch (error) {
            setError(error || "Unable to save hotel. Please try again.");
        }
    };

    // Hotel not found
    if (id && !existingHotel && !loading) {
        return (
            <>
                <Helmet>
                    <title>Hotel Not Found | StayNest</title>
                    <meta
                        name="description"
                        content="The hotel you are trying to edit could not be found on StayNest."
                    />
                </Helmet>

                <div className="min-h-screen pt-32 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">
                        Hotel not found
                    </h2>

                    <button
                        onClick={() => navigate("/")}
                        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg"
                    >
                        Back to Hotels
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            {/* SEO Metadata */}
            <Helmet>
                <title>
                    {id ? "Edit Hotel | StayNest" : "Add Hotel | StayNest"}
                </title>

                <meta
                    name="description"
                    content={
                        id
                            ? `Update ${existingHotel?.title || "hotel"} details, price, image and location on StayNest.`
                            : "Add a new hotel to StayNest. Enter hotel name, description, image, price and location details."
                    }
                />

                <meta
                    property="og:title"
                    content={
                        id ? "Edit Hotel | StayNest" : "Add Hotel | StayNest"
                    }
                />

                <meta
                    property="og:description"
                    content={
                        id
                            ? "Update hotel information on StayNest."
                            : "Add hotel information to StayNest."
                    }
                />

                <meta property="og:type" content="website" />
            </Helmet>

            <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4">
                <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-sm">

                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                        {id ? "Edit Hotel" : "Add New Hotel"}
                    </h1>

                    <p className="text-gray-500 mb-8">
                        Enter the hotel information below.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Hotel Image */}
                        <div>
                            <label className="block font-semibold mb-2">
                                Hotel Image
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="w-full border rounded-lg p-3"
                            />

                            <p className="mt-2 text-sm text-gray-500">
                                Upload an image (maximum size: 2 MB).
                            </p>

                            {preview && (
                                <img
                                    src={preview}
                                    alt={
                                        title
                                            ? `${title} hotel image preview`
                                            : "Hotel image preview"
                                    }
                                    className="mt-4 w-full max-w-xs h-48 object-cover rounded-lg"
                                />
                            )}
                        </div>

                        {/* Hotel Name */}
                        <div>
                            <label className="block font-semibold mb-2">
                                Hotel Name
                            </label>

                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter hotel name"
                                className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block font-semibold mb-2">
                                Description
                            </label>

                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter hotel description"
                                rows="4"
                                className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block font-semibold mb-2">
                                Price per Day (₹)
                            </label>

                            <input
                                type="number"
                                min="0.01"
                                step="0.01"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Enter price per day"
                                className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
                                required
                            />
                        </div>

                        {/* Latitude and Longitude */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>
                                <label className="block font-semibold mb-2">
                                    Latitude
                                </label>

                                <input
                                    type="number"
                                    step="any"
                                    min="-90"
                                    max="90"
                                    value={latitude}
                                    onChange={(e) => setLatitude(e.target.value)}
                                    placeholder="Example: 10.7905"
                                    className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block font-semibold mb-2">
                                    Longitude
                                </label>

                                <input
                                    type="number"
                                    step="any"
                                    min="-180"
                                    max="180"
                                    value={longitude}
                                    onChange={(e) => setLongitude(e.target.value)}
                                    placeholder="Example: 78.7047"
                                    className="w-full border rounded-lg p-3 outline-none focus:border-blue-500"
                                    required
                                />
                            </div>

                        </div>

                        {/* Error Message */}
                        {error && (
                            <p className="text-red-600 bg-red-50 p-3 rounded-lg">
                                {error}
                            </p>
                        )}

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-3 pt-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-6 py-3 rounded-lg"
                            >
                                {loading
                                    ? "Saving..."
                                    : id
                                        ? "Update Hotel"
                                        : "Save Hotel"}
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};
export default HotelForm;


