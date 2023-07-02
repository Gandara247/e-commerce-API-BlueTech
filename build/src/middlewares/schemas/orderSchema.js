"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const yup_1 = require("yup");
exports.orderSchema = {
    create: {
        body: (0, yup_1.object)({
            userEmail: (0, yup_1.string)().email().required(),
            couponId: (0, yup_1.number)().optional(),
            products: (0, yup_1.array)().of((0, yup_1.object)({
                productId: (0, yup_1.number)().required(),
                quantity: (0, yup_1.number)().required(),
                discount: (0, yup_1.number)().optional()
            })),
        }),
    },
    update: {
        params: (0, yup_1.object)({
            id: (0, yup_1.number)().required()
        }),
        body: (0, yup_1.object)({
            tatal: (0, yup_1.number)().optional(),
            couponId: (0, yup_1.number)().optional(),
            products: (0, yup_1.array)().of((0, yup_1.object)({
                productId: (0, yup_1.number)().required(),
                quantity: (0, yup_1.number)().optional(),
                discount: (0, yup_1.number)().optional()
            })).optional()
        }),
    },
    idRequired: {
        params: (0, yup_1.object)({ id: (0, yup_1.number)().required() })
    }
};
