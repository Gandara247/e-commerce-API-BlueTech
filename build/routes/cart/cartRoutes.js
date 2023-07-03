"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../../middlewares/authentication/authentication"));
const validateDTO_1 = __importDefault(require("../../middlewares/validateDTO/validateDTO"));
const cartSchema_1 = require("../../middlewares/schemas/cartSchema");
const cartController_1 = __importDefault(require("../../controllers/cartController"));
const cartRoutes = (0, express_1.Router)();
cartRoutes.get("/cart/:userId", authentication_1.default.authClient, cartController_1.default.fetchCartWithProducts);
cartRoutes.post("/cart/add", authentication_1.default.authClient, (0, validateDTO_1.default)(cartSchema_1.addProduct), cartController_1.default.addToCart);
cartRoutes.post("/cart/remove", authentication_1.default.authClient, (0, validateDTO_1.default)(cartSchema_1.removeProduct), cartController_1.default.removeFromCart);
exports.default = cartRoutes;
