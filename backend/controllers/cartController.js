import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const addToCart = async (req, res) => {
    const { productId } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            success: false,
            message: "Product ID is invalid",
        });
    }
    const userId = req.user.id;

    try {
        console.log("abc");
        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({
                success: false,
                message: "Product does not exist",
            });
        }

        let cart = await Cart.findById(userId);

        if (!cart) {
            cart = new Cart({
                _id: userId,
                items: [{ productId, quantity: 1 }],
            });
        } else {
            //check if the product already exists in the cart
            const existingItem = cart.items.find(
                (item) => item.productId == productId
            );

            if (existingItem) {
                //if the product exists, increase the quantity by 1
                existingItem.quantity += 1;
            } else {
                //if the product doesn't exist, add a new item to the cart
                cart.items.push({ productId, quantity: 1 });
            }
        }
        await cart.save();
        res.status(200).json({
            status: true,
            message: "Product added to cart successfully",
        });
    } catch (error) {
        console.error("Error adding to cart:", error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

const getCart = async (req, res) => {
    const userId = req.user.id;

    try {
        // Find the user's cart and populate the items' productId
        const cart = await Cart.findById(userId).populate("items.productId");

        if (!cart) {
            return res.status(200).json({
                success: true,
                message: "Cart retrieved successfully",
                items: {},
            });
        }

        // Convert the populated items to an array
        const itemsArray = cart.items.map((item) => ({
            product: item.productId, // This will contain the populated product data
            quantity: item.quantity,
        }));

        res.status(200).json({
            success: true,
            message: "Cart retrieved successfully",
            items: itemsArray,
        });
    } catch (error) {
        console.error("Error retrieving cart:", error.message);
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

const updateQuantity = async (req, res) => {
    const userId = req.user.id;
    const { id: productId } = req.params;
    const { quantity } = req.body;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID.",
        });
    }
    if (quantity === undefined || quantity <= 0) {
        return res.status(400).json({
            success: false,
            message: "Quantity must be greater than zero.",
        });
    }

    try {
        const cart = await Cart.findById(userId).populate({
            path: "items.productId",
            select: "stock",
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found.",
            });
        }

        const existingItem = cart.items.find(
            (item) => item.productId._id == productId
        );

        if (quantity > existingItem.productId.stock) {
            return res.status(400).json({
                success: false,
                message: "Requested quantity exceeds available stock.",
            });
        }

        existingItem.quantity = quantity;

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Quantity updated successfully.",
        });
    } catch (error) {
        console.error("Error retrieving cart:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};

const removeItemFromCart = async (req, res) => {
    const userId = req.user.id;
    const { id: productId } = req.params;

    if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid product ID.",
        });
    }

    try {
        // Find the cart for the user
        const cart = await Cart.findById(userId);

        // Check if the cart exists
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found.",
            });
        }

        // Check if the item exists in the cart
        const itemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if (itemIndex === -1) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart.",
            });
        }

        cart.items.splice(itemIndex, 1);

        await cart.save();

        res.status(200).json({
            success: true,
            message: "Item removed from cart successfully.",
        });
    } catch (error) {
        console.error("Error removing item from cart:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
            error: error.message,
        });
    }
};

export default { addToCart, getCart, updateQuantity, removeItemFromCart };
