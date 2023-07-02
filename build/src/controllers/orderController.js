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
const orderRepository_1 = __importDefault(require("../repositories/orderRepository"));
class OrderController {
    static createOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userEmail, couponId, products } = req.body;
                const user = yield db_1.prisma.user.findUnique({
                    where: { email: userEmail },
                    select: { id: true }
                });
                if (!user)
                    throw new apiError_1.default(404, "User not found.");
                const order = yield orderRepository_1.default.create({
                    userId: user.id,
                    products: products
                });
                return res.status(201).json(order);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static fetchUserOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const orders = yield orderRepository_1.default.fetchByUser(id);
                return res.status(200).json(orders);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static updateOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const order = yield orderRepository_1.default.update(Object.assign({ id }, req.body));
                return res.status(200).json(order);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static deleteOrder(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                yield orderRepository_1.default.delete(id);
                return res.sendStatus(204);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
    static fetchAllOrders(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orderRepository_1.default.fetchAll();
                return res.status(200).json(orders);
            }
            catch (error) {
                next(Error);
            }
        });
    }
    ;
    static fetchOrdersByProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const orders = yield orderRepository_1.default.fetchByProduct(id);
                return res.status(200).json(orders);
            }
            catch (error) {
                next(error);
            }
        });
    }
    ;
}
exports.default = OrderController;
;
