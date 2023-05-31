import { NextFunction, Response, Request } from "express";
import jwt
import apiError from "../../utils/api/apiError";



export default class Autrentication {
    static authClient (req: Request, res: Response, next: NextFunction){
        try {
            Autrentication.verify(req, res);
            next();
        }catch(error) {
            next(error);
        }
    }


}