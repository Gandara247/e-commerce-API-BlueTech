import jwt from "jsonwebtoken";
import apiError from "./api/apiError";
import env from "./dotEnvConfig/dotEnvConfig";


interface IPayLoad {
    name: string;
    email: string;
    role: "admin" | "client";
    iat?: number;
    exp?: number;
}

export default class jwtk {
    static createToken(payload: IPayLoad) {
        return jwt.sign(payload, env.JWTSECRET, {
            expiresIn: "30m",
        });
    }

    static createRefreshToken(email: string) {
        return jwt.sign({ email: email }, env.JWTREFRESHSECRET, {
            expiresIn: "1d"
        });
    }

    static verify(token: string | undefined) {
        if (!token) throw new apiError(401, "Token not found!");
        return jwt.verify(token, env.JWTSECRET) as IPayLoad;
    }

    static decode(token: string | undefined) {
        if (!token) throw new apiError(401, "Token not found!");
        return jwt.decode(token) as IPayLoad;
    }

    static verifyRefresh(token: string | undefined) {
        if (!token) throw new apiError(401, "Token not found!");
        return jwt.verify(token, env.JWTREFRESHSECRET);
    }
};