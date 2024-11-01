import React from "react";
import "../../style/loginPromptScreen.css";
import { useNavigate } from "react-router-dom";

const LoginPromptScreen = () => {
    const navigate = useNavigate();
    return (
        <div className="login-prompt-container">
            <h2 className="login-prompt-title">PLEASE LOG IN</h2>
            <p className="login-prompt-message">Login to view items.</p>
            <div className="login-image-container">
                {/* <img
                    src={loginImage}
                    alt="Login Prompt"
                    className="login-image"
                /> */}
            </div>
            <button className="login-button" onClick={() => navigate("/auth")}>
                LOGIN
            </button>
        </div>
    );
};

export default LoginPromptScreen;
