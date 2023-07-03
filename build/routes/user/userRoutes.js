"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authentication_1 = __importDefault(require("../../middlewares/authentication/authentication"));
const userController_1 = __importDefault(require("../../controllers/userController"));
const validateDTO_1 = __importDefault(require("../../middlewares/validateDTO/validateDTO"));
const userSchema_1 = require("../../middlewares/schemas/userSchema");
const userRoutes = (0, express_1.Router)();
userRoutes.get("/user", authentication_1.default.authAdmin, userController_1.default.index); //ok
userRoutes.post("/user", (0, validateDTO_1.default)(userSchema_1.userSchema.createUser), userController_1.default.createUserClient); //ok
userRoutes.post("/user/admin", authentication_1.default.authAdmin, (0, validateDTO_1.default)(userSchema_1.userSchema.createUser), userController_1.default.createUserAdmin); //ok
userRoutes.post("/user/login", (0, validateDTO_1.default)(userSchema_1.userSchema.login), userController_1.default.login); //ok
userRoutes.get("/user/logout", userController_1.default.logout); //ok
userRoutes.get("/user/:email", authentication_1.default.authClient, authentication_1.default.validateUserRole, userController_1.default.fetchByEmail); //ok
userRoutes.put("/user/:email", authentication_1.default.authClient, authentication_1.default.validateUserRole, (0, validateDTO_1.default)(userSchema_1.userSchema.updateUser), userController_1.default.update); //ok
userRoutes.delete("/user/:email", authentication_1.default.authClient, authentication_1.default.validateUserRole, (0, validateDTO_1.default)(userSchema_1.userSchema.deleteUser), userController_1.default.deleteUser); //OK
exports.default = userRoutes;
