import { Router } from "express";
import userRoutes from "./routes/user/userRoutes";


export const router = Router();

router.use(userRoutes)

router.get("/", async(req, res) =>{
    return res.sendStatus(200).json({"msg":"👌🏿 Application runnig successfully!" });
})