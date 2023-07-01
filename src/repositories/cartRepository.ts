import { prisma, } from "../database/db";
import apiError from "../utils/api/apiError";

interface CartInput {
    userId: number;
}

interface ProductCartInput {
    quantity: number;
    productId: number;
    cartId: number;
}

export default class CartRepository {
    static async cartWichProducts(userId: number) {
        return await prisma.cart.findUnique({
            where: { id: userId },
            include: { products: true },
        });
    }

    static async createCart(userId: number) {
        const data: CartInput = {
            userId,
        };

        return await prisma.cart.create({ data });
    };

    static async fetchProductsCart(cartId: number, productId: number) {
        return await prisma.productCart.findFirst({
            where: { cartId, productId }
        });

    };

    static async updateQuantity(cartItemId: number, quantity: number) {
        return await prisma.productCart.update({
            where: { id: cartItemId },
            data: { quantity },
        });
    };

    static async addProduct(userId: number, productId: number, quantity: number) {
        return await prisma.cart.update({
            where: { userId },
            data: {
                products: {
                    create: {
                        productId,
                        quantity,
                    }
                }
            }
        });
    };

    static async removeProduct(cartItemId: number) {
        return await prisma.productCart.delete({
            where: { id: cartItemId },
        });
    }

    static async fetchCartByUserId(userId: number) {
        return await prisma.cart.findFirst({
            where: { userId }
        });
    };

    static async fetchProductByUserCart(userId: number, productId: number) {
        const cart = await this.fetchCartByUserId(userId);
        if (!cart) return null;

        return await prisma.productCart.findFirst({
            where: { cartId: cart.id, productId }
        });
    };
};