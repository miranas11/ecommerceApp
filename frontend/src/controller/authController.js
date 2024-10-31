import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
const API_URL = "http://localhost:3001";

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

        console.log(response);
        return response;
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
        console.log(response.data);
        return response;
    } catch (error) {
        return error.response;
    }
};

export default { registerUser, loginUser };
