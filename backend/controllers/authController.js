import jwt from "jsonwebtoken";
import User from "../models/User.js";

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and password are required.",
        });
    }

    try {
        const foundUser = await User.findAndValidate(email, password);

        if (!foundUser) {
            return res
                .status(401)
                .json({ success: false, message: "Wrong Credentials" });
        }

        const token = jwt.sign(
            { name: foundUser.name, id: foundUser._id },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            domain: "ecommerce-app-eta-virid.vercel.app",
        });
        res.status(200).json({ success: true, user: foundUser });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Name, email, and password are required.",
        });
    }

    try {
        const user = new User({ name, email, password });
        await user.save();

        const token = jwt.sign(
            { name: user.name, id: user._id },
            process.env.SECRET_KEY,
            {
                expiresIn: "4h",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            domain: "ecommerce-app-eta-virid.vercel.app",
        });

        res.status(201).json({ success: true, user });
    } catch (error) {
        console.error("Registration Error:", error);
        if (error.code === 11000) {
            // Duplicate key error (for unique email)
            return res
                .status(409)
                .json({ success: false, message: "Email already exists." });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};

export default { loginUser, registerUser };
