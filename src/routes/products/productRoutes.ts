import { Router } from "express";
import productController from "../../controllers/productController";

const productRoutes = Router();

productRoutes.get("/products", productController.listProducts);
productRoutes.post("/products", productController.createProduct);
productRoutes.put("/products/:id", productController.updateProduct);
productRoutes.get("/products/:id", productController.fetchProductById);
productRoutes.delete("/products/:id", productController.deleteProduct);


export default productRoutes;