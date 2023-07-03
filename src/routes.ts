import { Router } from "express";
import userRoutes from "./routes/user/userRoutes";
import productRoutes from "./routes/products/productRoutes";
import categoryRoutes from "./routes/categories/categoryRoutes";
import cartRoutes from "./routes/cart/cartRoutes";
import orderRoutes from "./routes/orders/orderRoutes";


 const routes = Router();

routes.use(userRoutes);
routes.use(productRoutes);
routes.use(categoryRoutes);
routes.use(cartRoutes);
routes.use(orderRoutes);

routes.get("/health", async(req, res) =>{
    return res.status(200).json({"msg":"👌🏿 Application runnig successfully!" });
});

export default routes;