import express from "express";
import cors from "cors";
import  routes from "./routes";
import { prisma } from "./database/db";

async function main() {
    const app = express ();
    app.use(express.json());
    app.use(routes);
    app.use(cors())
    app.listen(3000, async () =>{
        console.log("server is running on https://127.0.0.1:3000");

        try {
            await prisma.$connect();
            console.log("🎲 Successfully connected to the database!");
            
        }catch(error){
            console.log("🤬 Faile connecting to the database!");
            
        }
        
    });
}

main().catch((error) => {
    console.log("🤬 erro!");
    console.log(error);    
    
});

