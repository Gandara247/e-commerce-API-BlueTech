import { prisma } from "../database/db";
import CartRepository from "../repositories/cartRepository";
import apiError from "../utils/api/apiError";
import { Request, Response, NextFunction } from "express";

export default class CartController {
    static async addToCart(req: Request, res: Response, next: NextFunction) {
        try {
            const { userEmail, productId, quantity } = req.body;
            const user = await prisma.user.findUnique({
                where: { email: userEmail },
                select: { id: true },
            });
            if (!user) throw new apiError(404, "User not found.");
            const cart = await CartRepository.fetchCartByUserId(user.id);

            if (!cart) { await CartRepository.createCart(user.id) };
            const productAlreadyExist = await CartRepository.fetchProductByUserCart(
                user.id,
                productId
            );
            if (productAlreadyExist) {
                await CartRepository.updateQuantity(productAlreadyExist.id, quantity);
                return res.sendStatus(204);
            } else {
                await CartRepository.addProduct(user.id, productId, quantity);
                return res.sendStatus(201)
            }
        } catch (error) {
            next(error);
        }
    }

    static async fetchCartWithProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const { cartId } = req.params;
            const cart = await CartRepository.cartWichProducts(parseInt(cartId));

            if (!cart) {
                throw new apiError(404, "Cart not Found.");
            }

            res.status(200).json(cart);

        } catch (error) {
            next(error);
        }
    }

    static async removeFromCart(req: Request, res: Response, next: NextFunction) {
        try {
            const { userEmail, productId } = req.body;
            const user = await prisma.user.findUnique({
                where: { email: userEmail },
                select: { id: true },
            });

            if (!user) { throw new apiError(404, "User not found.") };

            const cart = await CartRepository.fetchCartByUserId(user.id);

            if (!cart) { throw new apiError(404, "Cart not found.") };

            const productAlreadyExist = await CartRepository.fetchProductsCart(user.id, productId);

            if (!productAlreadyExist) { throw new apiError(404, "Product not found in cart.") }

            await CartRepository.removeProduct(productAlreadyExist.id);

            return res.sendStatus(204);

        } catch (error) {
            next(error);
        }


    }

}