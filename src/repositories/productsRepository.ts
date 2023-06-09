import { prisma } from "../database/db";
import apiError from "../utils/api/apiError";

export default class Product {
    static async fetchProducts() {
        return await prisma.product.findMany({
            select: {
                name: true,
                description: true,
                price: true,
                inventory:true
            },
        });
    }

    static async fetchProductId(id: number) {
        return await prisma.product.findUnique({
            where: { id },
            select: {
                name: true,
                description:true,
                price: true,
                inventory: true
            },
        });
    }

    static async createProduct({
        name,
        description,
        price,
        inventory
    }: {
        name: string;
        description: string;
        price: number;
        inventory: number;
    }) {
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                inventory
            }
        });

        return {
            name: product.name,
            description: product.description,
            price: product.price,
            inventory: product.inventory
        }
    }

    static async updateProduct({
        id,
        name,
        description,
        price,
        inventory

    }: {
        id: number,
        name?: string;
        description?: string;
        price?: number;
        inventory?: number
    }) {
        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                inventory
            }
        })

        return {
            name: product.name,
            description: product.description,
            price: product.price,
            inventory: product.inventory
        }
    }
    
    static async deleteProduct(id: number) {
            const product = await prisma.product.delete({
                where: { id },
            });
            if (!product) throw new apiError(404, "Produto não encontrado.");
    }

}
