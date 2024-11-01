import React from "react";
import productImage from "../../assets/product.png";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const openProductPage = () => {
        navigate(`/product/${product._id}`, { state: { product } });
    };

    return (
        <div className="product-card" onClick={openProductPage}>
            <div className="product-header">
                <div className="product-image">
                    <img src={product.imageUrl} alt="Product" />
                </div>
            </div>

            <div className="product-details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p className="price">Rs {product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
