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
    static async cartWichProducts(cartId: number){
        return await prisma.cart
    }
}