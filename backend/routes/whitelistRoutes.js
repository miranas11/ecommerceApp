import express from "express";
import whitelistController from "../controllers/whitelistController.js";
import validateToken from "../middlewares/authorize.js";

const router = express.Router();

router
    .route("/")
    .get(validateToken, whitelistController.getWhitelist)
    .post(validateToken, whitelistController.addToWhitelist);

router
    .route("/:id")
    .delete(validateToken, whitelistController.removeFromWhiteList);

export default router;
