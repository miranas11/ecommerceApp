import axios from "axios";

//const API_URL = "http://localhost:3001";
const API_URL = "https://ecommerceapp-production-d570.up.railway.app";
const getProducts = async (category, minPrice, maxPrice) => {
    try {
        const params = {};
        if (category) params.category = category;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;

        const response = await axios.get(`${API_URL}/products`, {
            params,
            withCredentials: true,
        });

        return response.data.products;
    } catch (error) {
        console.log("Error getting products:", error.response.data.message);
        return error.response;
    }
};
const addToCart = async (productId) => {
    try {
        const response = await axios.post(
            `${API_URL}/cart`,
            { productId },
            { withCredentials: true }
        );
        if (response.data.status) {
            alert("Product added to cart successfully");
        } else {
            alert(response.data.message);
            return false;
        }
        return true;
    } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
    }
};

const getCart = async () => {
    try {
        const response = await axios.get(`${API_URL}/cart`, {
            withCredentials: true,
        });
        if (response.data.success) {
            return response.data.items;
        } else {
            return [];
        }
    } catch (error) {
        console.log(
            "Error fetching cart:",
            error.response?.data?.message || error.message
        );

        return error.response.status;
    }
};

const updateQuantity = async (productId, quantity) => {
    try {
        const response = await axios.put(
            `${API_URL}/cart/${productId}`,
            { quantity },
            { withCredentials: true }
        );
        if (response.data.success) {
            alert("Quantity updated successfully");
            return true;
        } else {
            alert(response.data.message);
            return false;
        }
    } catch (error) {
        console.log(
            "Error updating quantity:",
            error.response?.data?.message || error.message
        );
        alert(error.response?.data?.message || "Failed to update quantity");
        return false;
    }
};
const removeItemFromCart = async (productId) => {
    try {
        const response = await axios.delete(`${API_URL}/cart/${productId}`, {
            withCredentials: true,
        });
        if (response.data.success) {
            alert("Item removed from cart successfully");
            return true;
        } else {
            alert(response.data.message);
            return false;
        }
    } catch (error) {
        console.log(
            "Error removing item from cart:",
            error.response?.data?.message || error.message
        );
        alert(
            error.response?.data?.message || "Failed to remove item from cart"
        );
        return false;
    }
};

const getWishlist = async () => {
    try {
        const response = await axios.get(`${API_URL}/wishlist`, {
            withCredentials: true,
        });
        if (response.data.success) {
            return response.data.items;
        } else {
            return [];
        }
    } catch (error) {
        console.log(
            "Error retrieving wishlist:",
            error.response?.data?.message || error.message
        );

        return error.response.status;
    }
};

const addToWishList = async (productId) => {
    try {
        const response = await axios.post(
            `${API_URL}/wishlist`,
            { productId },
            { withCredentials: true }
        );
        if (response.data.success) {
            alert("Product added to wishlist successfully");
        } else {
            alert(response.data.message);
            return false;
        }
        return true;
    } catch (error) {
        console.log(error.response.data.message);
        alert(error.response.data.message);
    }
};

const removeFromWishlist = async (productId) => {
    try {
        const response = await axios.delete(
            `${API_URL}/wishlist/${productId}`,
            {
                withCredentials: true,
            }
        );
        if (response.data.success) {
            alert("Product removed from wishlist successfully");
            return true;
        } else {
            alert(response.data.message);
            return false;
        }
    } catch (error) {
        console.log(
            "Error removing product from wishlist:",
            error.response?.data?.message || error.message
        );
        alert(
            error.response?.data?.message ||
                "Failed to remove product from wishlist"
        );
        return false;
    }
};

export default {
    getProducts,
    addToCart,
    addToWishList,
    getCart,
    updateQuantity,
    removeItemFromCart,
    getWishlist,
    removeFromWishlist,
};
