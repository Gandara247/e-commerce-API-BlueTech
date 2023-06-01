import { object, string } from "yup";

export const userSchema = {
    login: {
        body: object({
            email: string().required(),
            password: string().required(),
        }),
    },
    fetchById: {
        params: object({
            id: string().required(),
        }),
    },
    fetchByEmail: {
        params: object({
            email: string().email().required(),
        }),
    },

    createUser: {
        body: object({
            name: string().required(),
            email: string().required(),
            password: string().min(8).required(),
        }),
    },
    updateUser: {
        params: object({
            email: string().email().required(),
        }),
        body: object({
            name: string().optional(),
            password: string().min(8).optional(),
        }),

    },
    deleteUser: {
        paramas: object({
            email: string().email().required(),
        }),
    }
}