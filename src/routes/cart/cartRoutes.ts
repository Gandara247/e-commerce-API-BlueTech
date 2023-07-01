import { Router } from "express";
import Authentication from "../../middlewares/authentication/authentication";
import validateDto from "../../middlewares/validateDTO/validateDTO";
import { addProduct, removeProduct } from "../../middlewares/schemas/cartSchema";
import CartController from "../../controllers/cartController";

const cartRoutes = Router();

cartRoutes.get("/cart/:userId", Authentication.authClient, CartController.fetchCartWithProducts);
cartRoutes.post("/cart/add", Authentication.authClient, validateDto(addProduct), CartController.addToCart);
cartRoutes.post("/cart/remove", Authentication.authClient, validateDto(removeProduct), CartController.removeFromCart);

export default cartRoutes; 