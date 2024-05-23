"use server";

// Import necessary modules and components
import prisma from "./lib/db";
import { redirect } from "next/navigation";
import { supabase } from "./lib/supabase";
import { revalidatePath } from "next/cache";
import path from "path";
import {v4 as uuidv4} from "uuid";


// Function to create a new home entry for a user
export async function createAirChezBibiHome({ userId }: { userId: string }) {
    const data = await prisma.home.findFirst({
        where: { userId },
        orderBy: { createdAt: "desc" },
    });

    if (data === null) {
        // If user has no existing home, create a new one
        const newData = await prisma.home.create({
            data: { userId },
        });
        return redirect(`/create/${newData.id}/structure`);
    } else if (!data.addedCategory && !data.addedDescription && !data.addedLocation) {
        // If home is not fully structured, redirect to the appropriate step
        return redirect(`/create/${data.id}/structure`);
    } else if (data.addedCategory && !data.addedDescription) {
         // If category is added but description is missing, redirect to description step
        return redirect(`/create/${data.id}/description`);
    } else if (data.addedCategory && data.addedDescription && !data.addedLocation) {
          // If description is added but location is missing, redirect to address step
        return redirect(`/create/${data.id}/address`);
    } else if (data.addedCategory && data.addedDescription && data.addedLocation) {
        // If home is fully structured, create a new home entry for the user
        const newData = await prisma.home.create({
            data: { userId },
        });
        return redirect(`/create/${newData.id}/structure`);
    }
}

// Function to handle creating category page
export async function createCategoryPage(formData: FormData) {
    const categoryName = formData.get("categoryName") as string;
    const homeId = formData.get("homeId") as string;

    // Update home entry with selected category and mark category as added
    await prisma.home.update({
        where: { id: homeId },
        data: {
            categoryName,
            addedCategory: true,
        },
    });
    return redirect(`/create/${homeId}/description`);
}
// Function to handle creating description page
export async function CreateDescription(formData: FormData) {
    // Extract form data
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price");
    const imageFile = formData.get("image") as File;
    const homeId = formData.get("homeId") as string;
    const guestNumber = formData.get("guest") as string;
    const roomNumber = formData.get("room") as string;
    const bathroomsNumber = formData.get("bathroom") as string;
    
    console.log("Starting image upload...");
    console.log("image", imageFile);

    // Generate a unique name for the image (usually we use uuidv for Id but here it's for the name of the image)
    const uniqueImageId = uuidv4();
    const imagePath = `${uniqueImageId}`;
  
    // Upload image to Supabase storage
    const { data: imageData, error }  = await supabase.storage
        .from("images")
        .upload(imagePath, imageFile, {
            cacheControl: "2592000",
            contentType: imageFile.type, 
        });

    console.log("imageUpload:", imageData);
    console.log(error);
    
    // Update home entry with description data and mark description as added
    const data = await prisma.home.update({
        where: {
            id: homeId,
        },
        data: {
            title: title,
            description: description,
            price: Number(price),
            bedrooms: roomNumber,
            bathrooms: bathroomsNumber,
            guests: guestNumber,
            photo: imageData?.path,
            addedDescription: true,
        },
    });

    console.log("datas", data);
    return redirect(`/create/${homeId}/address`);
}
      
// Function to handle creating location page
export async function createLocation(formData: FormData) {
    const homeId = formData.get("homeId") as string;
    const countryValue = formData.get("countryValue") as string;

    // Update home entry with selected country and mark location as added
    await prisma.home.update({
        where: { id: homeId },
        data: {
            addedLocation: true,
            country: countryValue,
        },
    });

    return redirect("/");
}

// Function to add a home to favorites
export async function addToFavorite(formData:FormData) {
    const homeId = formData.get("homeId") as string;
    const userId = formData.get("userId") as string;
    const pathName = formData.get("pathName") as string;

    // Create a new favorite entry for the user
    const data = await prisma.favorite.create({
        data: {
            homeId:homeId,
            userId:userId,
        }
    });
    // Revalidate the path to reflect the changes
    revalidatePath(pathName)
}
// Function to delete a home from favorites
export async function deleteFromFavorite (formData:FormData) {
   const favoriteid = formData.get("favoriteId") as string;
   const pathName = formData.get("pathName") as string;
   const userId = formData.get("userId") as string;
    // Delete the entry for the user
    const data = await prisma.favorite.delete({
        where: {
            id: favoriteid,
            userId: userId,
        }
    });
    revalidatePath(pathName);
}
// Function to create a reservation
export async function createReservation(formData:FormData) {
    const userId = formData.get("userId") as string;
    const homeId = formData.get("homeId") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    // Create the new reservation entry for the user
    const data = await prisma.reservation.create({
        data: {
            userId:userId,
            endDate:endDate,
            startDate:startDate,
            homeId:homeId
        }
    });

    return redirect("/");
}
// Function to cancel a reservation
export async function cancelReservation(formData: FormData) {
    const reservationId = formData.get("reservationId") as string;
    // Cancel the specific reservation entry for the user
    const data = await prisma.reservation.delete({
        where: {
            id: reservationId,
        }
    });

    return redirect("/");
}

