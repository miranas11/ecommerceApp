import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./routes/authRoutes.js";
import cartRoute from "./routes/cartRoutes.js";
import productRoute from "./routes/productRoutes.js";
import whitelistRoute from "./routes/whitelistRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

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
