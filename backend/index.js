import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoutes.js";
import cartRoute from "./routes/cartRoutes.js";
import productRoute from "./routes/productRoutes.js";
import whitelistRoute from "./routes/whitelistRoutes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

app.use(express.json());
dotenv.config();

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

mongoose
    .connect(process.env.DATABASE_DEV_URL)
    .then(() => {
        console.log("Connection Open LOCAL");
    })
    .catch((e) => {
        console.log("ERROR");
    });

app.listen(process.env.PORT, () => {
    console.log(`Listening on Port ${process.env.PORT}`);
});

app.use("/", authRoute);
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/whitelist", whitelistRoute);
