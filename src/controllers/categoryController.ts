import { Response, Request, NextFunction } from "express";
import Category from "../repositories/catecoryRepository";

export default class CatecoryContoller {
    static async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const categories = await Category.fetchAll();
            return res.status(200).json(categories);
        } catch (error) {
            next(error);
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                name,
                description } = req.body;
            const category = await Category.create({ name, description });
            return res.status(201).json(category);
        } catch (error) {
            next(error)
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            const { name, description } = req.body;
            const category = await Category.update({
                id,
                name,
                description,
            });
            return res.status(200).json(category);
        } catch (error) {
            next(error);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const id = parseInt(req.params.id);
            await Category.delete(id);
            return res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

}
