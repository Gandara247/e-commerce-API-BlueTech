"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../../utils/jwt"));
const apiError_1 = __importDefault(require("../../utils/api/apiError"));
const jsonwebtoken_1 = require("jsonwebtoken");
class Authentication {
    static authClient(req, res, next) {
        try {
            Authentication.verify(req, res);
            next();
        }
        catch (error) {
            next(error);
        }
    }
    static authAdmin(req, res, next) {
        try {
            const user = Authentication.verify(req, res);
            if ((user === null || user === void 0 ? void 0 : user.role) !== "admin") {
                throw new apiError_1.default(403, "Exclusive access for administrators.");
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }
    static verify(req, res) {
        try {
            return jwt_1.default.verify(req.cookies.jsonwebtoken);
        }
        catch (error) {
            if (error instanceof jsonwebtoken_1.TokenExpiredError) {
                jwt_1.default.verifyRefresh(req.cookies.refreshtoken);
                const user = jwt_1.default.decode(req.cookies.jsonwebtoken);
                const token = jwt_1.default.createToken({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                });
                const refreshtoken = jwt_1.default.createRefreshToken(user.email);
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
                return user;
            }
            else {
                throw error;
            }
        }
    }
    static validateUserRole(req, res, next) {
        try {
            const { email } = req.params;
            const jwt = jwt_1.default.decode(req.cookies.jsonwebtoken);
            if (jwt.role === "client" && jwt.email !== email) {
                throw new apiError_1.default(403, "Unauthorized user!");
            }
            next();
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = Authentication;
