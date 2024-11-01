import express from "express";
import productController from "../controllers/productController.js";
import validateToken from "../middlewares/authorize.js";

const router = express.Router();

router.get("/:id", productController.getProductById);

router
    .route("/")
    .get(productController.getProducts)
    .post(productController.addProduct);

export default router;
