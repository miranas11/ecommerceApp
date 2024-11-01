import React, { useEffect } from "react";
import "../../style/wishListCard.css";
import productImage from "../../assets/product.png";
import apiController from "../../controller/apiController";

const WishlistCard = ({ item, onRemove }) => {
    const removeFromWishList = async () => {
        onRemove(item.productId._id);
    };
    const moveToBag = async () => {
        await apiController.addToCart(item.productId._id);
        removeFromWishList();
    };
    return (
        <div className="wishlist-card">
            <div className="card-image-container">
                <img
                    src={item.productId.imageUrl}
                    alt={item.productId.name}
                    className="card-image"
                />
                <button className="remove-button" onClick={removeFromWishList}>
                    &times;
                </button>
            </div>
            <div className="card-details">
                <p className="item-title">{item.productId.name}</p>
                <p className="item-price">Rs.{item.productId.price} </p>
                <button className="move-to-bag-button" onClick={moveToBag}>
                    MOVE TO BAG
                </button>
            </div>
        </div>
    );
};

export default WishlistCard;
