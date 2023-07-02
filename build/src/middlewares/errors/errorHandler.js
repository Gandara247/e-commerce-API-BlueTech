"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const client_1 = require("@prisma/client");
const multer_1 = require("multer");
const yup_1 = require("yup");
const apiError_1 = __importDefault(require("../../utils/api/apiError"));
function errorHandler(error, req, res, next) {
    var _a;
    if (error instanceof apiError_1.default) {
        return res.status(error.statusCode).json(error.message);
    }
    if (error instanceof jsonwebtoken_1.JsonWebTokenError) {
        return res.status(401).json(error.message);
    }
    if (error instanceof yup_1.ValidationError) {
        return res.status(400).json(error.message);
    }
    if (error instanceof multer_1.MulterError) {
        return res.status(400).json(error.message);
    }
    if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
        let status = 400;
        let message = undefined;
        switch (error.code) {
            case "P2025":
                status = 404;
                message = "Registro para atualização não encontrado";
                break;
            default:
                break;
        }
        return res.status(status).json(message || ((_a = error.meta) === null || _a === void 0 ? void 0 : _a.cause) || "Houve uma falha na requisição");
    }
    if (error instanceof client_1.Prisma.PrismaClientUnknownRequestError) {
        return res.status(400).json("Houve uma falha na requisição, existem conflitos entre valores enviados e permitidos");
    }
    console.error(error);
    return res.status(500).json("Erro interno do servidor.");
}
exports.default = errorHandler;
