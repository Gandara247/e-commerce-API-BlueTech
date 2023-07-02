"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const yup_1 = require("yup");
exports.categorySchema = {
    create: {
        body: (0, yup_1.object)({
            name: (0, yup_1.string)().required(),
            description: (0, yup_1.string)().optional(),
        }),
    },
    update: {
        params: (0, yup_1.object)({
            id: (0, yup_1.number)().required(),
        }),
        body: (0, yup_1.object)({
            name: (0, yup_1.string)().optional(),
            description: (0, yup_1.string)().optional(),
        }),
    },
    onlyIdRequired: {
        params: (0, yup_1.object)({
            id: (0, yup_1.number)().required(),
        }),
    },
};
