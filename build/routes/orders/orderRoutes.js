"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../../middlewares/authentication/authentication"));
const validateDTO_1 = __importDefault(require("../../middlewares/validateDTO/validateDTO"));
const orderSchema_1 = require("../../middlewares/schemas/orderSchema");
const orderController_1 = __importDefault(require("../../controllers/orderController"));
const orderRoutes = (0, express_1.Router)();
orderRoutes.get("/order/user/:id", authentication_1.default.authClient, (0, validateDTO_1.default)(orderSchema_1.orderSchema.idRequired), orderController_1.default.fetchUserOrders);
orderRoutes.post("/order", authentication_1.default.authClient, (0, validateDTO_1.default)(orderSchema_1.orderSchema.create), orderController_1.default.createOrder);
orderRoutes.delete("/order/:id", authentication_1.default.authClient, (0, validateDTO_1.default)(orderSchema_1.orderSchema.idRequired), orderController_1.default.deleteOrder);
orderRoutes.get("/order", authentication_1.default.authAdmin, orderController_1.default.fetchAllOrders);
orderRoutes.put("/order/:id", authentication_1.default.authAdmin, (0, validateDTO_1.default)(orderSchema_1.orderSchema.update), orderController_1.default.updateOrder);
orderRoutes.get("/order/product/:id", authentication_1.default.authAdmin, (0, validateDTO_1.default)(orderSchema_1.orderSchema.idRequired), orderController_1.default.fetchOrdersByProduct);
exports.default = orderRoutes;
