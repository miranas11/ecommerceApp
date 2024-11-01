import React from "react";
import { useLocation } from "react-router-dom";
import "../style/productDetailScreen.css";
import { CiHeart } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import apiController from "../controller/apiController";

const ProductDetailScreen = () => {
    const location = useLocation();
    const { product } = location.state || {};

    if (!product) {
        return <div>Product not found</div>;
    }

    const addToCart = async () => {
        await apiController.addToCart(product._id);
    };

    const addToWishList = async () => {
        apiController.addToWishList(product._id);
    };

    return (
        <div className="product-detail-screen">
            <div className="product-image-container">
                <img src={product.imageUrl} />
            </div>
            <div className="product-info">
                <h1>{product.name}</h1>
                <p className="description">{product.description}</p>
                <p className="price">Rs {product.price}</p>
                <p className="tax">Inclusive of all taxes</p>
                <div className="button-group">
                    <button className="add-to-cart-button" onClick={addToCart}>
                        <IoBagHandleOutline />
                        Add to Cart
                    </button>
                    <button
                        className="add-to-wishlist-button"
                        onClick={addToWishList}
                    >
                        <CiHeart className="heart" />
                        Wishlist
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailScreen;
