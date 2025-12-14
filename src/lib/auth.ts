import bcrypt from 'bcryptjs';
import { prisma } from './prisma';
import { signToken } from './jwt';

export async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
}

export async function verifyPassword(
    password: string,
    hashedPassword: string
): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
}

export async function createUser(data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    role?: string;
}) {
    const hashedPassword = await hashPassword(data.password);

    const user = await prisma.user.create({
        data: {
            ...data,
            password: hashedPassword,
            role: (data.role as any) || 'USER',
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            avatar: true,
            createdAt: true,
        },
    });

    const token = signToken({
        userId: user.id,
        email: user.email,
        role: user.role,
    });

    return { user, token };
}

export async function authenticateUser(email: string, password: string) {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        throw new Error('Invalid credentials');
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
        throw new Error('Invalid credentials');
    }

    const token = signToken({
        userId: user.id,
        email: user.email,
        role: user.role,
    });

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
}
