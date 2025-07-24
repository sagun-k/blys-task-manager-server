import prisma from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt, {SignOptions} from "jsonwebtoken";

export class AuthenticationService {
    private static readonly SALT_ROUNDS = 10;
    private static readonly JWT_SECRET = process.env.JWT_SECRET!;
    private static readonly JWT_EXPIRES_IN = "1H";

    static async register(email: string, name: string | undefined, password: string) {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            throw new Error("User already exists");
        }
        const hashedPassword = await bcrypt.hash(password, this.SALT_ROUNDS);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    static async login(email: string, password: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new Error("Invalid email or password");
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            throw new Error("Invalid email or password")
        }
        const payload = { userId: user.id, email: user.email };
        const options:SignOptions ={expiresIn:this.JWT_EXPIRES_IN};
        const token = jwt.sign(payload, this.JWT_SECRET, options);
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword, token };
    }

    static async checkAuth(userId: string) {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            throw new Error("UserId not found");
        }
        const { password: _, ...userWithoutPassword } = user;
        return { user: userWithoutPassword };
    }
    
    
    
    
}
