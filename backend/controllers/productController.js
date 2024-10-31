import mongoose from "mongoose";
import Product from "../models/Product.js";

const getProducts = async (req, res) => {
    const { category, minPrice, maxPrice } = req.query;

    //filter object based on the query parameters
    const filter = {};
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
    const { name, description, price, category, imageUrl, stock } = req.body;

    // Validation check to ensure required fields are provided
    if (!name || !price || !category || stock == null) {
        return res
            .status(400)
            .json({ success: false, message: "Required fields are missing." });
    }

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            imageUrl,
            stock,
        });

        const savedProduct = await newProduct.save();
        res.status(201).json({ success: true, product: savedProduct });
    } catch (error) {
        console.error("Error adding product:", error);
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
