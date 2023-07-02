"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apiError_1 = __importDefault(require("./api/apiError"));
const dotEnvConfig_1 = __importDefault(require("./dotEnvConfig/dotEnvConfig"));
class jwtk {
    static createToken(payload) {
        return jsonwebtoken_1.default.sign(payload, dotEnvConfig_1.default.JWTSECRET, {
            expiresIn: "30m",
        });
    }
    static createRefreshToken(email) {
        return jsonwebtoken_1.default.sign({ email: email }, dotEnvConfig_1.default.JWTREFRESHSECRET, {
            expiresIn: "1d"
        });
    }
    static verify(token) {
        if (!token)
            throw new apiError_1.default(401, "Token not found!");
        return jsonwebtoken_1.default.verify(token, dotEnvConfig_1.default.JWTSECRET);
    }
    static decode(token) {
        if (!token)
            throw new apiError_1.default(401, "Token not found!");
        return jsonwebtoken_1.default.decode(token);
    }
    static verifyRefresh(token) {
        if (!token)
            throw new apiError_1.default(401, "Token not found!");
        return jsonwebtoken_1.default.verify(token, dotEnvConfig_1.default.JWTREFRESHSECRET);
    }
}
exports.default = jwtk;
;
