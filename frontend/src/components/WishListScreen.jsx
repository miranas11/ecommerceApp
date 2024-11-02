import React, { useEffect, useState } from "react";
import WishlistCard from "./utils/WishListCard";
import apiController from "../controller/apiController";
import "../style/wishListScreen.css";
import LoginPromptScreen from "./utils/LoginPromptScreen";
import Loading from "./utils/Loading";

const WishlistScreen = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [wishlistItems, setWishlistItems] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(true);

    useEffect(() => {
        const fetchWishlist = async () => {
            const response = await apiController.getWishlist();
            if (response === 403 || response === 500) {
                setIsLoggedIn(false);
            } else {
                setWishlistItems(response);
            }
            setIsLoading(false);
        };
        fetchWishlist();
    }, []);

    const handleRemove = async (productId) => {
        try {
            const success = await apiController.removeFromWishlist(productId);
            if (success) {
                setWishlistItems((prevItems) =>
                    prevItems.filter((item) => item.productId._id !== productId)
                );
            }
        } catch (error) {
            console.error("Error removing item:", error);
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    if (!isLoggedIn) {
        return <LoginPromptScreen />;
    }

    return (
        <div className="wishlist-screen">
            <h2 className="wishlist-title">
                My <span className="highlight">Wishlist</span>{" "}
                {wishlistItems.length} items
            </h2>
            <div className="wishlist-container">
                {wishlistItems.map((item, index) => (
                    <WishlistCard
                        key={index}
                        item={item}
                        onRemove={() => handleRemove(item.productId._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default WishlistScreen;
