"use server";

import prisma from "./lib/db";
import { redirect } from "next/navigation";
import { supabase } from "./lib/supabase";
import path from "path";

export async function createAirChezBibiHome({ userId }: { userId: string }) {
    const data = await prisma.home.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    if (data === null) {
        const newData = await prisma.home.create({
            data: { userId },
        });
        return redirect(`/create/${newData.id}/structure`);
    } else if (!data.addedCategory && !data.addedDescription && !data.addedLocation) {
        return redirect(`/create/${data.id}/structure`);
    } else if (data.addedCategory && !data.addedDescription) {
        return redirect(`/create/${data.id}/description`);
    } else if (data.addedCategory && data.addedDescription && !data.addedLocation) {
        return redirect(`/create/${data.id}/address`);
    } else if (data.addedCategory && data.addedDescription && data.addedLocation) {
        const newData = await prisma.home.create({
            data: { userId },
        });
        return redirect(`/create/${newData.id}/structure`);
    }
}

export async function createCategoryPage(formData: FormData) {
    const categoryName = formData.get("categoryName") as string;
    const homeId = formData.get("homeId") as string;

    await prisma.home.update({
        where: { id: homeId },
        data: {
            categoryName,
            addedCategory: true,
        },
    });
    return redirect(`/create/${homeId}/description`);
}

export async function CreateDescription(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price");
    const imageFile = formData.get("image") as File;
    const homeId = formData.get("homeId") as string;

    const guestNumber = formData.get("guest") as string;
    const roomNumber = formData.get("room") as string;
    const bathroomNumber = formData.get("bathroom") as string;

    const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/png",
    });

    console.log("Image Data:", imageData); 

    await prisma.home.update({
        where: { id: homeId },
        data: {
            title,
            description,
            price: Number(price),
            bedrooms: roomNumber,
            bathrooms: bathroomNumber,
            guests: guestNumber,
            photo: imageData?.path,
            addedDescription: true,
        },
    });

    return redirect(`/create/${homeId}/address`);
}

export async function createLocation(formData: FormData) {
    const homeId = formData.get("homeId") as string;
    const countryValue = formData.get("countryValue") as string;

    await prisma.home.update({
        where: { id: homeId },
        data: {
            addedLocation: true,
            country: countryValue,
        },
    });

    return redirect("/");
}
