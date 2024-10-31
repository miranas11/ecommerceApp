import axios from "axios";

const API_URL = "http://localhost:3001";

const getProducts = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`, {
            withCredentials: true,
        });

        console.log(response.data);
        return response;
    } catch (error) {
        console.log("Error getting products:", error.response.data.message);
        return error.response;
    }
};

export default { getProducts };
