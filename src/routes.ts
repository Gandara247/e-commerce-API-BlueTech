import { Router } from "express";
import userRoutes from "./routes/user/userRoutes";
import productRoutes from "./routes/products/productRoutes";


 const routes = Router();

routes.use(userRoutes)
routes.use(productRoutes)
routes.use(categoryRoutes);

routes.get("/", async(req, res) =>{
    return res.sendStatus(200).json({"msg":"👌🏿 Application runnig successfully!" });
});

export default routes;