import prisma from "../lib/prisma";
import bcrypt from "bcrypt";

export default async function initializeDatabase() {
    const existingUser = await prisma.user.findUnique({
        where: { email: "demo@blys.com" },
    });

    if (!existingUser) {
        const hashedPassword = await bcrypt.hash("password", 10);
        await prisma.user.create({
            data: {
                name: "Demo Blys",
                email: "demo@blys.com",
                password: hashedPassword,
            },
        });
        console.log("👤 Demo user created: demo@blys.com / password");
    } else {
        console.log("ℹ️ Demo user already exists.");
    }
}
