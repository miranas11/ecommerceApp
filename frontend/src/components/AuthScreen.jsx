import React, { useEffect, useState } from "react";
import "../style/auth.css";
import background from "../assets/auth_bg.jpeg";
import logo from "../assets/logo_white.png";
import { useNavigate } from "react-router-dom";
import authController from "../controller/authController.js";
import Loading from "./utils/Loading.jsx";

const AuthScreen = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [showLogin, setShowLogin] = useState(true);

    // useEffect(() => {
    //     const token = localStorage.getItem("token");
    //     if (!token) {
    //         setIsLoading(false);
    //         return;
    //     }
    //     const validate = async () => {
    //         const response = await authController.validateToken();
    //         if (response.status === 201) navigate("/shop/home");
    //         setIsLoading(false);
    //     };
    //     validate();
    // }, []);

    const handleLogin = () => {
        setShowLogin(true);
    };

    const handleRegister = () => {
        setShowLogin(false);
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="ecommerce-home">
            <div className="ecommerce-header">
                <img
                    src={background}
                    alt="Background"
                    className="ecommerce-background"
                />
                <div className="ecommerce-content-container">
                    {showLogin ? (
                        <Login handleRegister={handleRegister} />
                    ) : (
                        <Register handleLogin={handleLogin} />
                    )}
                </div>
            </div>
        </div>
    );
};

const Login = ({ handleRegister }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await authController.loginUser(email, password);
        if (response.status === 200) {
            // navigate("/shop/home");
        } else {
            setError(response.data.message);
        }
    };

    return (
        <div className="ecommerce-login">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>Welcome Back!</h2>
            <p>Sign in to continue shopping</p>
            <form onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="ecommerce-btn">
                    Log In
                </button>
                <p className="account-option">
                    Don’t have an account?{" "}
                    <span onClick={handleRegister} className="ecommerce-link">
                        Sign Up
                    </span>
                </p>
            </form>
        </div>
    );
};

const Register = ({ handleLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await authController.registerUser(
            name,
            email,
            password
        );
        if (response.status === 201) {
            // navigate("/shop/home");
        } else {
            setError(response.data.message);
        }
    };

    return (
        <div className="ecommerce-register">
            <div className="logo-container">
                <img src={logo} alt="Logo" className="logo" />
            </div>
            <h2>Create Your Account</h2>
            <p>Sign up to start your shopping journey</p>
            <form onSubmit={handleSubmit}>
                {error && <p className="error">{error}</p>}
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="ecommerce-btn">
                    Sign Up
                </button>
                <p className="account-option">
                    Already have an account?{" "}
                    <span onClick={handleLogin} className="ecommerce-link">
                        Log In
                    </span>
                </p>
            </form>
        </div>
    );
};

export default AuthScreen;
