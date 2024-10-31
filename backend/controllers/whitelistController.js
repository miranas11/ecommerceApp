import mongoose from "mongoose";
import Whitelist from "../models/Whitelist.js";
import Product from "../models/Product.js";

// Get the whitelist for the authenticated user
const getWhitelist = async (req, res) => {
    const userId = req.user.id; // Get the user ID from the request

    try {
        const whitelist = await Whitelist.findById(userId).populate(
            "items.productId"
        );

        if (!whitelist) {
            return res.status(404).json({
                success: true,
                items: {},
            });
        }

        res.status(200).json({
            success: true,
            message: "Whitelist retrieved successfully.",
            items: whitelist.items,
        });
    } catch (error) {
        console.error("Error retrieving whitelist:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};

// Add a product to the whitelist
const addToWhitelist = async (req, res) => {
    const userId = req.user.id; // Get the user ID from the request
    const { productId } = req.body; // Get the product ID from the request body

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            success: false,
            message: "Product ID is invalid.",
        });
    }

    try {
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: "Product does not exist",
            });
        }
        let whitelist = await Whitelist.findById(userId);

        // If the whitelist doesn't exist, create a new one
        if (!whitelist) {
            whitelist = new Whitelist({
                _id: userId,
                items: [{ productId }],
            });
        } else {
            // Check if the product already exists in the whitelist
            const productExists = whitelist.items.some(
                (item) => item.productId.toString() === productId
            );

            if (productExists) {
                return res.status(400).json({
                    success: false,
                    message: "Product already exists in the whitelist.",
                });
            }

            // If not, add the new product to the whitelist
            whitelist.items.push({ productId });
        }

        await whitelist.save();

        res.status(201).json({
            success: true,
            message: "Product added to whitelist successfully.",
        });
    } catch (error) {
        console.error("Error adding to whitelist:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};

// Remove a product from the whitelist
const removeFromWhiteList = async (req, res) => {
    const userId = req.user.id; // Get the user ID from the request
    const { id: productId } = req.params; // Get the product ID from request parameters

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            success: false,
            message: "Product ID is invalid.",
        });
    }

    try {
        const whitelist = await Whitelist.findById(userId);

        // Check if the whitelist exists
        if (!whitelist) {
            return res.status(404).json({
                success: false,
                message: "Whitelist not found.",
            });
        }

        // Check if the product exists in the whitelist
        const itemIndex = whitelist.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Product not found in the whitelist.",
            });
        }

        whitelist.items.splice(itemIndex, 1);

        await whitelist.save();

        res.status(200).json({
            success: true,
            message: "Product removed from whitelist successfully.",
        });
    } catch (error) {
        console.error("Error removing from whitelist:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};

export default { getWhitelist, addToWhitelist, removeFromWhiteList };
