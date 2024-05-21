import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function GET () {
    // Retrieve the user session using Kinde authentication
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    // Check if the user exists and has a valid ID
    if (!user || user === null || !user.id) {
        throw new Error ("Humm something went wrong... sorry...");
    }

    // Attempt to find the user in the database by their ID
    let dbUser = await prisma.user.findUnique({
        where: {
            id: user.id
        }
    });

    // If the user doesn't exist in the database, create a new user record
    if (!dbUser) {
        dbUser = await prisma.user.create({
            data: {
                email: user.email ?? "",
                firstname: user.given_name ?? "",
                lastname: user.family_name ?? "",
                id: user.id,
                profileImage: user.picture ?? `https://avatar.vercel/sh/${user.given_name}`,
            }
        });
    }

    // Redirect the user to the specified URL after processing
    return NextResponse.redirect("http://localhost:3000");
}
