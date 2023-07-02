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
const bcrypt_1 = __importDefault(require("bcrypt"));
const apiError_1 = __importDefault(require("../utils/api/apiError"));
class User {
    static fetchUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.user.findMany({
                select: {
                    name: true,
                    email: true,
                    role: true
                },
            });
        });
    }
    static fetchUseId(id, includePassword = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.user.findUnique({
                where: { id },
                select: {
                    name: true,
                    email: true,
                    password: includePassword,
                    role: true
                },
            });
        });
    }
    static fetchUserEmail(email, includePassword = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.user.findUnique({
                where: { email },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    password: includePassword,
                    role: true
                },
            });
        });
    }
    static createUser({ name, email, password, role }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.prisma.user.create({
                data: {
                    name,
                    email,
                    password: yield bcrypt_1.default.hash(password, 8),
                    role,
                }
            });
            return {
                name: user.name,
                email: user.email,
                role: user.role,
            };
        });
    }
    static updateUser({ name, email, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_1.prisma.user.update({
                where: { email },
                data: {
                    name,
                    password: password ? yield bcrypt_1.default.hash(password, 8) : undefined,
                }
            });
            return {
                name: user.name,
                email: user.email,
                role: user.role,
            };
        });
    }
    static deleteUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const user = yield tx.user.findUnique({
                    where: { email },
                    select: { id: true },
                });
                if (!user)
                    throw new apiError_1.default(404, "Usuário não encontrado.");
                const orders = yield tx.order.findMany({
                    where: { userId: user.id },
                    select: { id: true },
                });
                yield tx.productOrder.deleteMany({
                    where: { orderId: { in: orders.map((o) => o.id) } },
                });
                yield tx.order.deleteMany({
                    where: { userId: user.id },
                });
                yield tx.user.delete({
                    where: { email },
                });
            }));
        });
    }
}
exports.default = User;
