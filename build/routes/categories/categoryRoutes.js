"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const categoryController_1 = __importDefault(require("../../controllers/categoryController"));
const authentication_1 = __importDefault(require("../../middlewares/authentication/authentication"));
const validateDTO_1 = __importDefault(require("../../middlewares/validateDTO/validateDTO"));
const categorySchema_1 = require("../../middlewares/schemas/categorySchema");
const categoryRoutes = (0, express_1.Router)();
categoryRoutes.get("/category", categoryController_1.default.getAll);
categoryRoutes.post("/category", authentication_1.default.authAdmin, (0, validateDTO_1.default)(categorySchema_1.categorySchema.create), categoryController_1.default.create);
categoryRoutes.put("/category/:id", authentication_1.default.authAdmin, (0, validateDTO_1.default)(categorySchema_1.categorySchema.update), categoryController_1.default.update);
categoryRoutes.delete("/category/:id", authentication_1.default.authAdmin, (0, validateDTO_1.default)(categorySchema_1.categorySchema.onlyIdRequired), categoryController_1.default.delete);
exports.default = categoryRoutes;
