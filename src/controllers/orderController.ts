import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/db";
import apiError from "../utils/api/apiError";
import OrderRepository from "../repositories/orderRepository";

export default class OrderController {
    static async createOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const { userEmail, couponId, products } = req.body;
            const user = await prisma.user.findUnique({
                where: { email: userEmail },
                select: { id: true }
            });
            if (!user) throw new apiError(404, "User not found.");
            const order = await OrderRepository.create({
                userId: user.id,
                products: products
            });
            return res.status(201).json(order);
        } catch (error) {
            next(error);
        }
    };
    static async fetchUserOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const orders = await OrderRepository.fetchByUser(id);
            return res.status(200).json(orders);
        } catch (error) {
            next(error);
        }
    };

    static async updateOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const order = await OrderRepository.update({ id, ...req.body });
            return res.status(200).json(order);
        } catch (error) {
            next(error);
        }
    };
    static async deleteOrder(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await OrderRepository.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    };

    static async fetchAllOrders(req: Request, res: Response, next: NextFunction) {
        try {
            const orders = await OrderRepository.fetchAll();
            return res.status(200).json(orders);
        } catch (error) {
            next(Error);
        }
    };

    static async fetchOrdersByProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const orders = await OrderRepository.fetchByProduct(id);
            return res.status(200).json(orders);
        } catch (error) {
            next(error)
        }
    };
};