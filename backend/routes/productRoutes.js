import express from "express";
import productController from "../controllers/productController.js";
import validateToken from "../middlewares/authorize.js";

const router = express.Router();

router.get("/:id", productController.getProductById);

router
    .route("/")
    .get(validateToken, productController.getProducts)
    .post(validateToken, productController.addProduct);

export default router;
