"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const productsRepository_1 = __importDefault(require("../repositories/productsRepository"));
const storeImages_1 = __importDefault(require("../utils/storeImages"));
class productController {
    static listProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productsRepository_1.default.fetchProducts();
                return res.status(200).json(products);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static searchProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { keyWord } = req.params;
                const products = yield productsRepository_1.default.searchProduct(keyWord);
                return res.status(200).json(products);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static fetchByCategory(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield productsRepository_1.default.fetchByCategory(req.params.category);
                return res.status(200).json(products);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static createProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, price, inventory, categories } = req.body;
                // let images: string[] | undefined = undefined;
                // if(req.files) {
                //     images = await storeImages(req.files as Array<Express.Multer.File>);
                // }
                const product = yield productsRepository_1.default.createProduct({
                    name,
                    description,
                    price,
                    inventory,
                    categories,
                    // images,
                });
                return res.status(201).json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static updateProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                let images = undefined;
                if (req.files) {
                    images = yield (0, storeImages_1.default)(req.files);
                }
                const { name, description, price, inventory, categories } = req.body.data;
                const product = yield productsRepository_1.default.updateProduct({
                    id,
                    name,
                    description,
                    price,
                    inventory,
                    categories,
                    images,
                });
                return res.status(200).json(product);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                yield productsRepository_1.default.deleteProduct(id);
                return res.sendStatus(204);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static newImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                const images = yield (0, storeImages_1.default)(req.files);
                const image = yield productsRepository_1.default.newImage(id, images);
                console.log(images);
                return res.status(201).json(image);
            }
            catch (error) {
                next(error);
            }
        });
    }
    static deleteImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(req.params.id);
                yield productsRepository_1.default.deleteImage(id);
                return res.send(204);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = productController;
