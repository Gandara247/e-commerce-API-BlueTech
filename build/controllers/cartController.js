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
const db_1 = require("../database/db");
const cartRepository_1 = __importDefault(require("../repositories/cartRepository"));
const apiError_1 = __importDefault(require("../utils/api/apiError"));
class CartController {
    static addToCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userEmail, productId, quantity } = req.body;
                const user = yield db_1.prisma.user.findUnique({
                    where: { email: userEmail },
                    select: { id: true },
                });
                if (!user)
                    throw new apiError_1.default(404, "User not found.");
                const cart = yield cartRepository_1.default.fetchCartByUserId(user.id);
                if (!cart) {
                    yield cartRepository_1.default.createCart(user.id);
                }
                ;
                const productAlreadyExist = yield cartRepository_1.default.fetchProductByUserCart(user.id, productId);
                if (productAlreadyExist) {
                    yield cartRepository_1.default.updateQuantity(productAlreadyExist.id, quantity);
                    return res.sendStatus(204);
                }
                else {
                    yield cartRepository_1.default.addProduct(user.id, productId, quantity);
                    return res.sendStatus(201);
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    static fetchCartWithProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const cart = yield cartRepository_1.default.cartWichProducts(parseInt(userId));
                if (!cart) {
                    throw new apiError_1.default(404, "Cart not Found.");
                }
                res.status(200).json(cart);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static removeFromCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userEmail, productId } = req.body;
                const user = yield db_1.prisma.user.findUnique({
                    where: { email: userEmail },
                    select: { id: true },
                });
                if (!user) {
                    throw new apiError_1.default(404, "User not found.");
                }
                ;
                const cart = yield cartRepository_1.default.fetchCartByUserId(user.id);
                if (!cart) {
                    throw new apiError_1.default(404, "Cart not found.");
                }
                ;
                const productAlreadyExist = yield cartRepository_1.default.fetchProductsCart(user.id, productId);
                if (!productAlreadyExist) {
                    throw new apiError_1.default(404, "Product not found in cart.");
                }
                yield cartRepository_1.default.removeProduct(productAlreadyExist.id);
                return res.sendStatus(204);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = CartController;
