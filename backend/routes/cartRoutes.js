import express from "express";
import cartController from "../controllers/cartController.js";
import validateToken from "../middlewares/authorize.js";

const router = express.Router();

router
    .route("/")
    .get(validateToken, cartController.getCart)
    .post(validateToken, cartController.addToCart);

router
    .route("/:id")
    .put(validateToken, cartController.updateQuantity)
    .delete(validateToken, cartController.removeItemFromCart);

export default router;
