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

app.use(cors({
    origin: true,
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser()); // must come before any middleware using req.cookies

app.get('/api-docs.json', (req, res) => {
    res.json(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", apiRouter);

app.get("/", async (req, res) => {
    const dbTime = await prisma.$queryRaw`SELECT NOW()`;
    res.send(`✅ API is running. DB time: ${JSON.stringify(dbTime)}`);
});

(async () => {
    try {
        console.log("⏳ Connecting to database...");
        await prisma.$connect();
        console.log("✅ Connected to database");

        await initializeDatabase();
        console.log("✅ Database initialized");

        app.listen(PORT, () => {
            console.log(`🚀 Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to connect to database or initialize", err);
        process.exit(1);
    }
})();
