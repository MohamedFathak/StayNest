const API_URL = "http://localhost:5000/api/hotels";
const getAuthHeaders = () => {
    const token = localStorage.getItem("staynest_token");
    return token
        ? { Authorization: `Bearer ${token}` }
        : {};
};
export const getHotels = async (params = {}) => {
    const query = new URLSearchParams(params).toString();

    const response = await fetch(
        `${API_URL}${query ? `?${query}` : ""}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to fetch hotels.");
    }

    return data;
};
export const getHotelById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to fetch hotel.");
    }

    return data;
};
export const createHotel = async (formData) => {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to add hotel.");
    }

    return data;
};
export const updateHotel = async (id, formData) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to update hotel.");
    }

    return data;
};
export const deleteHotel = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Unable to delete hotel.");
    }
    return data;
};


