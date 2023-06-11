import { prisma } from "../database/db";

export default class Category {
    static async fetchAll() {
        return await prisma.category.findMany()
    }

    static async create(
        { name, description }: { name: string, description: string },
    ) {
        return await prisma.category.create({
            data: {
                name,
                description,
            },
        });
    }

    static async update(
        {
            id, name, description
        }: {
            id: number;
            name: string;
            description: string;
        }
    ) {
        return await prisma.category.update({
            where: { id },
            data: {
                name,
                description,
            },
        });
    }

    static async delete(id: number) {
        await prisma.category.delete({
            where: { id },
        });
    }

}