import bcrypt from "bcrypt";
import { prisma } from "../src/database/db";

async function main() {
    const salt = bcrypt.genSaltSync(8)
    await prisma.user.upsert({
        where: {id: 1},
        update: {},
        create: {
            id: 1,
            name: "joao cunha",
            email: "joao@gmail.com",
            password: bcrypt.hashSync("12345678", salt),
            role: "admin"
        },
    });    
};

main()
.then(async () => {
    await prisma.$disconnect();
})
.catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();    
});