import React, { useEffect } from "react";
import timelineImage from "../assets/timeline.png";
import "../style/productScreen.css";
import ProductCard from "./ProductCard";
import apiController from "../controller/apiController.js";

const ProductsScreen = () => {
    const getProducts = async () => {
        const response = await apiController.getProducts();

        return response;
    };
    useEffect(() => {
        getProducts();
    }, []);
    return (
        <div>
            <div className="timeline-container">
                <img
                    src={timelineImage}
                    alt="Timeline"
                    className="timeline-image"
                />
            </div>
            <ProductCard />
        </div>
    );
};

export default ProductsScreen;
