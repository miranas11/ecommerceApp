import mongoose from "mongoose";
import Product from "../models/Product.js";

const getProducts = async (req, res) => {
    const { category, minPrice, maxPrice } = req.query;

    const allowedCategories = [
        "electronics",
        "fashion",
        "home",
        "sports",
        "toys",
        "other",
    ];
    const filter = {};
    if (category) {
        if (allowedCategories.includes(category.toLowerCase())) {
            filter.category = category;
        } else {
            return res
                .status(400)
                .json({ success: false, message: "Invalid category" });
        }
    }

    if (category) filter.category = category;
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    try {
        const products = await Product.find(filter);
        res.status(200).json({ success: true, products });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const addProduct = async (req, res) => {
    const products = req.body;

    // Validation check to ensure the array is provided and is not empty
    if (!Array.isArray(products) || products.length === 0) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Product array is required and should not be empty.",
            });
    }

    try {
        const savedProducts = [];

        for (const product of products) {
            const { name, description, price, category, imageUrl, stock } =
                product;

            // Validation check for each product
            if (!name || !price || !category || stock == null) {
                return res
                    .status(400)
                    .json({
                        success: false,
                        message:
                            "Required fields are missing in one or more products.",
                    });
            }

            const newProduct = new Product({
                name,
                description,
                price,
                category,
                imageUrl,
                stock,
            });

            const savedProduct = await newProduct.save();
            savedProducts.push(savedProduct);
        }

        res.status(201).json({ success: true, products: savedProducts });
    } catch (error) {
        console.error("Error adding products:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id.trim())) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res
                .status(404)
                .json({ status: false, message: "Product not found" });
        }
        res.status(200).json({ status: true, product });
    } catch (error) {
        console.error("Error fetching product by ID:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export default { getProducts, addProduct, getProductById };
