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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../database/db");
class CartRepository {
    static cartWichProducts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.cart.findUnique({
                where: { id: userId },
                include: { products: true },
            });
        });
    }
    static createCart(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = {
                userId,
            };
            return yield db_1.prisma.cart.create({ data });
        });
    }
    ;
    static fetchProductsCart(cartId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.productCart.findFirst({
                where: { cartId, productId }
            });
        });
    }
    ;
    static updateQuantity(cartItemId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.productCart.update({
                where: { id: cartItemId },
                data: { quantity },
            });
        });
    }
    ;
    static addProduct(userId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.cart.update({
                where: { userId },
                data: {
                    products: {
                        create: {
                            productId,
                            quantity,
                        }
                    }
                }
            });
        });
    }
    ;
    static removeProduct(cartItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.productCart.delete({
                where: { id: cartItemId },
            });
        });
    }
    static fetchCartByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.cart.findFirst({
                where: { userId }
            });
        });
    }
    ;
    static fetchProductByUserCart(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield this.fetchCartByUserId(userId);
            if (!cart)
                return null;
            return yield db_1.prisma.productCart.findFirst({
                where: { cartId: cart.id, productId }
            });
        });
    }
    ;
}
exports.default = CartRepository;
;
