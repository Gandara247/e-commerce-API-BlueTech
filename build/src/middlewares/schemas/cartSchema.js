"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeProduct = exports.addProduct = void 0;
const yup_1 = require("yup");
const addProduct = {
    body: (0, yup_1.object)({
        userEmail: (0, yup_1.string)().email().required(),
        productId: (0, yup_1.number)().required(),
        quantity: (0, yup_1.number)().required(),
    }).defined()
};
exports.addProduct = addProduct;
const removeProduct = {
    body: (0, yup_1.object)({
        userEmail: (0, yup_1.string)().email().required(),
        productId: (0, yup_1.number)().required(),
    }).defined(),
};
exports.removeProduct = removeProduct;
