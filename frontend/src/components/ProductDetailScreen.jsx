import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../style/productDetailScreen.css";
import { CiHeart } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
import apiController from "../controller/apiController";
import Loading from "./utils/Loading";

const ProductDetailScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const { product } = location.state || {};
    const [updatedProduct, setUpdatedProduct] = useState(product || null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await apiController.getProductById(id);
                if (response.status) {
                    console.log(response);
                    setUpdatedProduct(response.product);
                }
            } catch (error) {
                console.log("Error fetching product:", error.message);
            }
        };

        if (!product) {
            fetchProduct();
        }
    }, [id, product]);

    if (!updatedProduct) {
        return <Loading />;
    }

    const addToCart = async () => {
        const response = await apiController.addToCart(updatedProduct._id);
        if (!response) {
            navigate("/auth");
        }
    };

    const addToWishList = async () => {
        const response = await apiController.addToWishList(updatedProduct._id);
        if (!response) {
            navigate("/auth");
        }
    };

    return (
        <div className="product-detail-screen">
            <div className="product-image-container">
                <img src={updatedProduct.imageUrl} alt="Product" />
            </div>
            <div className="product-info">
                <h1>{updatedProduct.name}</h1>
                <p className="description">{updatedProduct.description}</p>
                <p className="price">Rs {updatedProduct.price}</p>
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
