// Import the PrismaClient from the @prisma/client package
import { PrismaClient } from "@prisma/client";

// Function to create a new instance of PrismaClient
const prismaClientSingleton = () => {
    return new PrismaClient()
}

// Declare a global variable for Prisma
declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// Assign the global Prisma variable to a new PrismaClient instance or reuse an existing one
const prisma = globalThis.prisma ?? prismaClientSingleton()
export default prisma

// In non-production environments, store the PrismaClient instance in the global scope
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
