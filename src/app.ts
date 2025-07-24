import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import prisma from "./lib/prisma";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./swagger";
import apiRouter from "./routes";
import cookieParser from "cookie-parser";
import initializeDatabase from "./dbinit/initDatabase";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://blys-task-manager-client.vercel.app",
    ],
    credentials: true,
}));


app.use(express.json());
app.use(cookieParser()); // ✅ must come before any middleware using req.cookies


app.get('/api-docs.json', (req, res) => {
    res.json(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", apiRouter);


app.get("/", async (req, res) => {
    const dbTime = await prisma.$queryRaw`SELECT NOW()`;
    res.send(`✅ API is running. DB time: ${JSON.stringify(dbTime)}`);
});

app.listen(PORT, async () => {
    try {
        await prisma.$connect();
        console.log("✅ Connected to database");
        await initializeDatabase();
    } catch (err) {
        console.error("❌ Failed to connect to database", err);
        process.exit(1);
    }
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
