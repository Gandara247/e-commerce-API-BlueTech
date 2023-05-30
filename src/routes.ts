import { Router } from "express";
import userRoutes from "./routes/user/userRoutes";


 const routes = Router();

routes.use(userRoutes)

routes.get("/", async(req, res) =>{
    return res.sendStatus(200).json({"msg":"👌🏿 Application runnig successfully!" });
});

export default routes;