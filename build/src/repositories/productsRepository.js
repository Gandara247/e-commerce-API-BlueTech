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
const db_1 = require("../database/db");
const apiError_1 = __importDefault(require("../utils/api/apiError"));
const deleteImage_1 = __importDefault(require("../utils/deleteImage"));
class ProductRepository {
    static fetchProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.product.findMany({
                include: { categories: true, images: true },
            });
        });
    }
    static searchProduct(keyWord) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.product.findMany({
                where: { name: { contains: keyWord } },
                include: { categories: true, images: true },
            });
        });
    }
    static fetchByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.category.findMany({
                where: { name: { in: category } },
                include: { products: { include: { categories: true, images: true } } }
            });
        });
    }
    static createProduct({ name, price, description, inventory, categories, images, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.product.create({
                data: {
                    name,
                    price,
                    description,
                    inventory,
                    categories: {
                        connectOrCreate: categories === null || categories === void 0 ? void 0 : categories.map((category) => {
                            return {
                                where: { name: category },
                                create: { name: category },
                            };
                        }),
                    },
                    images: {
                        create: images === null || images === void 0 ? void 0 : images.map((image) => {
                            return { filename: image };
                        }),
                    },
                },
            });
        });
    }
    static updateProduct({ id, name, description, price, inventory, categories, images, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.product.update({
                where: { id },
                data: {
                    name,
                    description,
                    price,
                    inventory,
                    categories: {
                        connectOrCreate: categories === null || categories === void 0 ? void 0 : categories.map((category) => {
                            return {
                                where: { name: category },
                                create: { name: category },
                            };
                        }),
                    },
                    images: {
                        create: images === null || images === void 0 ? void 0 : images.map((image) => {
                            return { filename: image };
                        }),
                    },
                },
            });
        });
    }
    static deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteOrders = db_1.prisma.productOrder.deleteMany({
                where: { productId: id },
            });
            const deleteImages = db_1.prisma.productImage.deleteMany({
                where: { productId: id },
            });
            const deleteProduct = db_1.prisma.product.delete({
                where: { id }
            });
            yield db_1.prisma.$transaction([deleteOrders, deleteProduct, deleteImages]);
        });
    }
    static newImage(productId, images) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.productImage.createMany({
                data: images.map((image) => {
                    return { filename: image, productId };
                }),
            });
        });
    }
    static deleteImage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield db_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const image = yield tx.productImage.findUnique({
                    where: { id },
                    select: { filename: true },
                });
                if (!image)
                    throw new apiError_1.default(404, "Image not found!");
                yield (0, deleteImage_1.default)(image.filename);
                return yield tx.productImage.delete({
                    where: { id },
                });
            }));
        });
    }
}
exports.default = ProductRepository;
