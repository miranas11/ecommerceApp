import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import "../../style/navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = localStorage.getItem("jwtToken");

    const isAuthPage = location.pathname === "/auth";

    return (
        <nav className="navbar">
            <div className="navbar-brand" onClick={() => navigate("/")}>
                <img src={logo} alt="Logo" className="logo" />
            </div>

            <div className="navbar-icons">
                <Link to="/wishlist">
                    <FaHeart />
                    <span className="icon-label">Wishlist</span>
                </Link>
                <Link to="/cart" className="cart-link">
                    <FaShoppingBag />
                    <span className="icon-label">Bag</span>
                </Link>

                {!isAuthPage &&
                    (token ? (
                        <button
                            className="logout-button"
                            onClick={() => {
                                localStorage.removeItem("jwtToken");
                                navigate("/auth");
                            }}
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            className="login-button"
                            onClick={() => navigate("/auth")}
                        >
                            Login
                        </button>
                    ))}
            </div>
        </nav>
    );
};

export default Navbar;
