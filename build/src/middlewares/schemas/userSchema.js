"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = void 0;
const yup_1 = require("yup");
exports.userSchema = {
    login: {
        body: (0, yup_1.object)({
            email: (0, yup_1.string)().email().required(),
            password: (0, yup_1.string)().required(),
        }),
    },
    getUserById: {
        params: (0, yup_1.object)({
            id: (0, yup_1.string)().required(),
        }),
    },
    getUserByEmail: {
        params: (0, yup_1.object)({
            email: (0, yup_1.string)().email().required(),
        }),
    },
    createUser: {
        body: (0, yup_1.object)({
            name: (0, yup_1.string)().required(),
            email: (0, yup_1.string)().email().required(),
            password: (0, yup_1.string)().min(8).required(),
        }),
    },
    updateUser: {
        params: (0, yup_1.object)({
            email: (0, yup_1.string)().email().required(),
        }),
        body: (0, yup_1.object)({
            name: (0, yup_1.string)().optional(),
            password: (0, yup_1.string)().min(8).optional(),
        }),
    },
    deleteUser: {
        params: (0, yup_1.object)({
            email: (0, yup_1.string)().email().required(),
        }),
    },
};
