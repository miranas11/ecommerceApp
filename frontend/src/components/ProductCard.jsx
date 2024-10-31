import React from "react";
import productImage from "../assets/product.png";
import "../style/productCard.css";

const ProductCard = () => {
    return (
        <div className="product-card">
            <div className="product-header">
                <div className="product-image">
                    <img src={productImage} alt="Product" />
                </div>
            </div>

            <div className="product-details">
                <h2>{"name"}</h2>
                <p>{"description"}</p>
                <p className="price">{"Rs. 12"}</p>
            </div>
        </div>
    );
};

export default ProductCard;
