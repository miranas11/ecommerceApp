import React, { useEffect, useState } from "react";
import timelineImage from "../assets/timeline.png";
import "../style/productScreen.css";
import apiController from "../controller/apiController.js";
import ProductCard from "./utils/ProductCard.jsx";

const ProductsScreen = () => {
    const [productsList, setProductsList] = useState([]);

    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    const categories = [
        "",
        "electronics",
        "fashion",
        "home",
        "sports",
        "toys",
        "other",
    ];

    const getProducts = async () => {
        const response = await apiController.getProducts(
            category,
            minPrice,
            maxPrice
        );
        setProductsList(response);
    };
    useEffect(() => {
        getProducts();
    }, []);

    const handleFilterChange = () => {
        getProducts();
    };

    return (
        <div>
            <div className="timeline-container">
                <img
                    src={timelineImage}
                    alt="Timeline"
                    className="timeline-image"
                />
            </div>
            <div className="filter-container">
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>
                            {cat
                                ? cat.charAt(0).toUpperCase() + cat.slice(1)
                                : "All Categories"}
                        </option>
                    ))}
                </select>
                <input
                    type="number"
                    placeholder="Min price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />
                <button onClick={handleFilterChange}>Apply Filters</button>
            </div>
            {productsList.length === 0 ? (
                <div className="no-products">
                    <p>
                        No products available. Please adjust your filters or try
                        again later.
                    </p>
                </div>
            ) : (
                <div className="product-container">
                    {productsList.map((product, index) => (
                        <ProductCard product={product} key={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductsScreen;
