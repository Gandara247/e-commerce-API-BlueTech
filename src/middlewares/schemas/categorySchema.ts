import { number, object, string } from "yup";

export const categorySchema = {
    create: {
        body: object({
            name: string().required(),
            description: string().optional(),
        }),
    },

    update: {
        params: object({
            id: number().required(),
        }),
        body: object({
            name: string().optional(),
            description: string().optional(),
        }),
    },

    onlyIdRequired: {
        params: object({
            id: number().required(),
        }),
    },
};