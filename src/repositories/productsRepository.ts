import { prisma } from "../database/db";
import apiError from "../utils/api/apiError";
import deleteImage from "../utils/deleteImage";

export default class ProductRepository {
    static async fetchProducts() {
        return await prisma.product.findMany({
            include: { categories: true, images: true },
        });
    }

    static async searchProduct(keyWord: string) {
        return await prisma.product.findMany({
            where: { name: { contains: keyWord } },
            include: { categories: true, images: true },
        });
    }

    static async fetchByCategory(category: string | Array<string>) {
        return await prisma.category.findMany({
            where: { name: { in: category } },
            include: { products: { include: { categories: true, images: true } } }
        });
    }

    static async createProduct({
        name,
        price,
        description,
        inventory,
        categories,
        images,
      }: {
        name: string;
        price: number;
        description: string;
        inventory: number;
        categories?: Array<string>;
        images?: Array<string>;
      }) {
        return await prisma.product.create({
          data: {
            name,
            price,
            description,
            inventory,
            categories: {
              connectOrCreate: categories?.map((category) => {
                return {
                  where: { name: category },
                  create: { name: category },
                };
              }),
            },
            images: {
              create: images?.map((image) => {
                return { filename: image };
              }),
            },
          },
        });
      }

    static async updateProduct({
        id,
        name,
        description,
        price,
        inventory,
        categories,
        images,

    }: {
        id: number,
        name?: string;
        description?: string;
        price?: number;
        inventory?: number;
        categories?: Array<string>;
        images?: Array<string>;
    }) {
        return await prisma.product.update({
            where: { id },
            data: {
                name,
                description,
                price,
                inventory,
                categories: {
                    connectOrCreate: categories?.map((category) => {
                        return {
                            where: { name: category },
                            create: { name: category },
                        };
                    }),

                },
                images: {
                    create: images?.map((image) => {
                        return {filename: image};
                    }),
                },
            },
        });       
    }

    static async deleteProduct(id: number) {
        const deleteOrders = prisma.productOrder.deleteMany({
            where: {productId: id},
        });

        const deleteImages = prisma.productImage.deleteMany({
            where: {productId: id},
        });
        const deleteProduct = prisma.product.delete({
            where: { id }
        });
        await prisma.$transaction([deleteOrders, deleteProduct, deleteImages]);
    }

    static async newImage(productId: number, images: string[]) {
        return await prisma.productImage.createMany({
            data: images.map((image) => {
                return {filename: image, productId};
            }),
        });
    }
    static async deleteImage(id: number) {
        return await prisma.$transaction(async (tx) => {
            const image = await tx.productImage.findUnique({
                where: {id},
                select: {filename: true},
            });
            if (!image) throw new apiError(404, "Image not found!");
            await deleteImage(image.filename);
            return await tx.productImage.delete({
                where: {id},
            });
        });
    }

}
