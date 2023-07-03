"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./routes/user/userRoutes"));
const productRoutes_1 = __importDefault(require("./routes/products/productRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categories/categoryRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cart/cartRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orders/orderRoutes"));
const routes = (0, express_1.Router)();
routes.use(userRoutes_1.default);
routes.use(productRoutes_1.default);
routes.use(categoryRoutes_1.default);
routes.use(cartRoutes_1.default);
routes.use(orderRoutes_1.default);
routes.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ "msg": "👌🏿 Application runnig successfully!" });
}));
exports.default = routes;
