import { Decimal } from "@prisma/client/runtime";
import { prisma } from "../database/db";
import apiError from "../utils/api/apiError";

export default class OrderRepository {
    static async create({ userId, products }:
        {
            userId: number;
            products: Array<{ productId: number; quantity: number }>;
        },
    ) {
        return await prisma.$transaction(async (tx) => {
            const total = await tx.product.aggregate({
                _sum: { price: true },
                where: { id: { in: products.map((p) => p.productId) } },
            });
            if (!total._sum.price) { throw new apiError(400, "Invalid product.") }

            for (const product of products) {
                await tx.product.update({
                    where: { id: product.productId },
                    data: { inventory: { decrement: product.quantity } },
                });
            }

            return await tx.order.create({
                data: {
                    userId,
                    total: total._sum.price,
                    products: { create: products },
                }
            });
        });
    }
    static async fetchAll() {
        return await prisma.order.findMany({
            include: { products: true }
        });
    }
    static async fetchByUser(userId: number) {
        return await prisma.order.findMany({
            where: { userId },
            include: { products: true }
        });
    }

    static async fetchByProduct(id: number) {
        return await prisma.product.findMany({
            where: { id },
            include: { orders: true }
        });
    }

    static async update({ id, products, total, couponId }: {
        id: number;
        products?: { productId: number, quantity?: number, discount?: Decimal }[];
        total?: Decimal;
        couponId?: number;
    }) {
        return await prisma.order.update({
            where: { id },
            data: {
                products: {
                    updateMany: products?.map((p) => {
                        return {
                            where: { productId: p.quantity },
                            data: {
                                quantity: p.quantity,
                                discount: p.discount
                            }
                        };
                    }),
                },
                total, couponId: couponId,
            },
        });
    }

    static async delete(id: number) {
        await prisma.$transaction(async (tx) => {
            const products = await tx.productOrder.findMany({
                where: { orderId: id },
                select: { productId: true, quantity: true }
            });
            for (const p of products) {
                await tx.product.update({
                    where: { id: p.productId },
                    data: { inventory: { increment: p.quantity } }
                });
            }
            await tx.productOrder.deleteMany({
                where: { orderId: id }
            });
            await tx.order.delete({
                where: { id }
            });
        });
    }
}