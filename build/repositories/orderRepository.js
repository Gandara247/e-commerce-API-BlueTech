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
const apiError_1 = __importDefault(require("../utils/api/apiError"));
class OrderRepository {
    static create({ userId, products }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const total = yield tx.product.aggregate({
                    _sum: { price: true },
                    where: { id: { in: products.map((p) => p.productId) } },
                });
                if (!total._sum.price) {
                    throw new apiError_1.default(400, "Invalid product.");
                }
                for (const product of products) {
                    yield tx.product.update({
                        where: { id: product.productId },
                        data: { inventory: { decrement: product.quantity } },
                    });
                }
                return yield tx.order.create({
                    data: {
                        userId,
                        total: total._sum.price,
                        products: { create: products },
                    }
                });
            }));
        });
    }
    static fetchAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.order.findMany({
                include: { products: true }
            });
        });
    }
    static fetchByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.order.findMany({
                where: { userId },
                include: { products: true }
            });
        });
    }
    static fetchByProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.product.findMany({
                where: { id },
                include: { orders: true }
            });
        });
    }
    static update({ id, products, total, couponId }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.order.update({
                where: { id },
                data: {
                    products: {
                        updateMany: products === null || products === void 0 ? void 0 : products.map((p) => {
                            return {
                                where: { productId: p.quantity },
                                data: {
                                    quantity: p.quantity,
                                    discount: p.discount
                                }
                            };
                        }),
                    },
                    total, couponId: couponId,
                },
            });
        });
    }
    static delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const products = yield tx.productOrder.findMany({
                    where: { orderId: id },
                    select: { productId: true, quantity: true }
                });
                for (const p of products) {
                    yield tx.product.update({
                        where: { id: p.productId },
                        data: { inventory: { increment: p.quantity } }
                    });
                }
                yield tx.productOrder.deleteMany({
                    where: { orderId: id }
                });
                yield tx.order.delete({
                    where: { id }
                });
            }));
        });
    }
}
exports.default = OrderRepository;
