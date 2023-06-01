import { Router } from "express";
import Authentication from "../../middlewares/authentication/authentication";
import userController from "../../controllers/userController";

const userRoutes = Router();


userRoutes.get("/users", Authentication.authAdmin, userController.index);
userRoutes.post("/user")

export default userRoutes;