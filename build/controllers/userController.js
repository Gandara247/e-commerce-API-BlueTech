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
const userRepository_1 = __importDefault(require("../repositories/userRepository"));
const apiError_1 = __importDefault(require("../utils/api/apiError"));
const jwt_1 = __importDefault(require("../utils/jwt"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class userController {
    static login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield userRepository_1.default.fetchUserEmail(email, true);
                if (!user)
                    throw new apiError_1.default(404, "🔎User not found!");
                if (!bcrypt_1.default.compareSync(password, user.password)) {
                    throw new apiError_1.default(400, "🛑 Invalid data!");
                }
                const token = jwt_1.default.createToken({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                });
                const refreshtoken = jwt_1.default.createRefreshToken(email);
                res.cookie("jsonwebtoken", token, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                });
                res.cookie("refreshtoken", refreshtoken, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                });
                return res.status(200).json({
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    id: user.id,
                    token
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    static logout(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.clearCookie("jsonwebtoken");
                res.clearCookie("refreshtoken");
                return res.sendStatus(200);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userRepository_1.default.fetchUsers();
                return res.status(200).json(users);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static fetchById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const user = yield userRepository_1.default.fetchUseId(parseInt(id));
                if (!user) {
                    throw new apiError_1.default(404, "🔎 User not found for this ID.");
                }
                ;
                return res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static fetchByEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const user = yield userRepository_1.default.fetchUserEmail(email);
                if (!user) {
                    throw new apiError_1.default(404, "🔎 User not found for this email.");
                }
                ;
                return res.json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createUserAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const user = yield userRepository_1.default.createUser({
                    name,
                    email,
                    password,
                    role: "admin",
                });
                return res.status(201).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createUserClient(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const user = yield userRepository_1.default.createUser({
                    name,
                    email,
                    password,
                    role: "client",
                });
                return res.status(201).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                const { name, password } = req.body;
                const user = yield userRepository_1.default.updateUser({
                    name,
                    email,
                    password,
                });
                return res.status(200).json(user);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.params;
                yield userRepository_1.default.deleteUser(email);
                return res.sendStatus(204);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = userController;
