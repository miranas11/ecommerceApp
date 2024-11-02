import React from "react";
import productImage from "../../assets/product.png";
import { useNavigate } from "react-router-dom";
import { IoBagHandleOutline } from "react-icons/io5";
import apiController from "../../controller/apiController";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const openProductPage = () => {
        navigate(`/product/${product._id}`, { state: { product } });
    };

    const truncateDescription = (description, wordLimit) => {
        const words = description.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + "...";
        }
        return description;
    };
    const addToCart = async (event) => {
        event.stopPropagation();
        const response = await apiController.addToCart(product._id);
        if (!response) {
            navigate("/auth");
        }
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
                <p>{truncateDescription(product.description, 5)}</p>
                <p className="price">Rs {product.price}</p>
            </div>

            <button className="add-to-cart-button1" onClick={addToCart}>
                <IoBagHandleOutline className="cart-icon" />
                <p>Add to Cart</p>
            </button>
        </div>
    );
};

export default ProductCard;
