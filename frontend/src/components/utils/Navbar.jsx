import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingBag } from "react-icons/fa";
import "../../style/navbar.css";
import logo from "../../assets/logo.png";

const Navbar = () => {
    const navigate = useNavigate();
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
            </div>
        </nav>
    );
};

export default Navbar;
