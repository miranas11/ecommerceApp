import React, { useEffect, useState } from "react";
import "../style/cartScreen.css";
import "../style/cartCard.css";
import apiController from "../controller/apiController";
import productImage from "../assets/product.png";
import Loading from "./utils/Loading";
import LoginPromptScreen from "./utils/LoginPromptScreen";

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [estimatedTotal, setEstimatedTotal] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const response = await apiController.getCart();

            if (response === 403 || response === 500) {
                setIsLoggedIn(false);
            } else {
                setCartItems(response);
                const tempEstimatedTotal = response.reduce(
                    (total, item) => total + item.product.price * item.quantity,
                    0
                );
                setEstimatedTotal(tempEstimatedTotal);
            }
            setIsLoading(false);
        };

        fetchData();
    }, []);

    useEffect(() => {
        const tempEstimatedTotal = cartItems.reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
        );
        setEstimatedTotal(tempEstimatedTotal);
    }, [cartItems]);

    const handleEstimatedPriceChange = (change) => {
        setEstimatedTotal(estimatedTotal + change);
    };
    if (!isLoggedIn) {
        return <LoginPromptScreen />;
    }

    if (isLoading) {
        return <Loading />;
    }

    const handleRemoveItem = (productId) => {
        setCartItems((prevItems) =>
            prevItems.filter((item) => item.product._id !== productId)
        );
    };

    return (
        <div className="cart-container">
            <h2>🛒 My Cart</h2>
            {cartItems.map((item) => (
                <CartCard
                    key={item.id}
                    item={item}
                    onRemoveItem={handleRemoveItem}
                    onQunatityChange={handleEstimatedPriceChange}
                />
            ))}
            <div className="cart-summary">
                <div className="pricing-details">
                    <p>
                        Shipping cost: <span>TBD</span>
                    </p>
                    <p>
                        Discount: <span>- $0</span>
                    </p>

                    <h3>
                        Estimated Total: <span>Rs {estimatedTotal}</span>
                    </h3>
                </div>

                <button className="checkout-btn">Checkout</button>
            </div>
        </div>
    );
};

export default CartScreen;

const CartCard = ({ item, onRemoveItem, onQunatityChange }) => {
    const [quantity, setQuantity] = useState(item.quantity);

    const updateQuantity = async (updatedQuantity) => {
        onQunatityChange((updatedQuantity - quantity) * item.product.price);
        setQuantity(updatedQuantity);
        await apiController.updateQuantity(item.product._id, updatedQuantity);
    };

    const removeItem = async () => {
        const response = await apiController.removeItemFromCart(
            item.product._id
        );

        if (response) {
            onRemoveItem(item.product._id);
        }
    };

    return (
        <div className="cart-card">
            <div className="cart-card-details">
                <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="cart-card-image"
                />
                <div className="cart-card-info">
                    <h4>{item.product.name}</h4>

                    <p>In Stock</p>
                    <div className="cart-card-actions">
                        <button onClick={removeItem}>Remove</button>
                    </div>
                </div>
            </div>
            <div className="cart-card-pricing">
                <p>Each: Rs {item.product.price}</p>
                <label>
                    Quantity:
                    <select
                        value={quantity}
                        onChange={(e) => updateQuantity(e.target.value)}
                    >
                        {[...Array(10).keys()].map((i) => (
                            <option key={i + 1} value={i + 1}>
                                {i + 1}
                            </option>
                        ))}
                    </select>
                </label>
                <p>Total: Rs{item.product.price * quantity}</p>
            </div>
        </div>
    );
};
