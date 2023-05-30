import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { Prisma } from "@prisma/client"
import { MulterError } from "multer";
import { ValidationError } from "yup";
import apiError from "../../utils/api/apiError";

export default function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof apiError) {
        return res.status(error.statusCode).json(error.message);
    }

    if (error instanceof JsonWebTokenError) {
        return res.status(401).json(error.message);
    }
    if (error instanceof ValidationError) {
        return res.status(400).json(error.message);
    }
    if (error instanceof MulterError) {
        return res.status(400).json(error.message);
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
        return res.status(status).json(
            message || error.meta?.cause || "Houve uma falha na requisição",
        );
    }
    if (error instanceof Prisma.PrismaClientUnknownRequestError) {
        return res.status(400).json(
            "Houve uma falha na requisição, existem conflitos entre valores enviados e permitidos",
        );
    }
    console.error(error);
    return res.status(500).json("Erro interno do servidor.");

}


