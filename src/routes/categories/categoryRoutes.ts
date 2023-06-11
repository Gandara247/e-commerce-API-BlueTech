import { Router } from "express";
import CatecoryContoller from "../../controllers/categoryController";
import Authentication from "../../middlewares/authentication/authentication";
import validateDto from "../../middlewares/validateDTO/validateDTO";
import { categorySchema } from "../../middlewares/schemas/categorySchema";

const categoryRoutes = Router();

categoryRoutes.get("/category", CatecoryContoller.getAll);
categoryRoutes.post("/category", Authentication.authAdmin, validateDto(categorySchema.create), CatecoryContoller.create);
categoryRoutes.put("/category/:id", Authentication.authAdmin, validateDto(categorySchema.update), CatecoryContoller.update);
categoryRoutes.delete("/category/:id", Authentication.authAdmin, validateDto(categorySchema.onlyIdRequired), CatecoryContoller.delete);

export default categoryRoutes;