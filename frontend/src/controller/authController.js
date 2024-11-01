import axios from "axios";
// const API_URL = "http://localhost:3001";
const API_URL = "https://ecommerceapp-production-d570.up.railway.app";
const registerUser = async (name, email, password) => {
    try {
        const response = await axios.post(
            `${API_URL}/register`,
            {
                name,
                email,
                password,
            },
            {
                withCredentials: true,
            }
        );

        return response.data;
    } catch (error) {
        console.log("Error registering admin:", error.response.data);
        return error.response;
    }
};

const loginUser = async (email, password) => {
    try {
        const response = await axios.post(
            `${API_URL}/login`,
            {
                email,
                password,
            },
            {
                withCredentials: true,
            }
        );
        return response;
    } catch (error) {
        return error.response;
    }
};

const validateToken = async () => {
    try {
        const response = await axios.get(`${API_URL}/validate`, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        console.log(
            "Invalid or expired token:",
            error.response?.data?.message || error.message
        );
        return error.response.data;
    }
};

export default { registerUser, loginUser, validateToken };
