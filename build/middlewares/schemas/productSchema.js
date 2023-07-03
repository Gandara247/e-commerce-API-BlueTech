"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchemas = void 0;
const yup_1 = require("yup");
exports.productSchemas = {
    findBycategory: {
        params: (0, yup_1.object)({
            category: (0, yup_1.string)().required(),
        }),
    },
    search: {
        params: (0, yup_1.object)({
            keyword: (0, yup_1.string)().required(),
        }),
    },
    newProduct: {
        body: (0, yup_1.object)({
            name: (0, yup_1.string)().required(),
            description: (0, yup_1.string)().required(),
            price: (0, yup_1.number)().required(),
            category: (0, yup_1.array)().of((0, yup_1.string)()),
            inventory: (0, yup_1.number)().required(),
        }),
    },
    updateProduct: {
        params: (0, yup_1.object)({
            id: (0, yup_1.number)().required(),
        }),
        body: (0, yup_1.object)({
            data: (0, yup_1.object)({
                name: (0, yup_1.string)().optional(),
                description: (0, yup_1.string)().optional(),
                price: (0, yup_1.number)().optional(),
                category: (0, yup_1.array)().of((0, yup_1.string)()).optional(),
                inventory: (0, yup_1.number)().optional(),
            }),
        }),
    },
    onlyIdRequired: {
        params: (0, yup_1.object)({
            id: (0, yup_1.number)().required(),
        }),
    },
};
