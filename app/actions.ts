"use server"

import prisma from "./lib/db";
import { redirect } from "next/navigation";
import { supabase } from "./lib/supabase";

 /* Creates a new Air Chez Bibi home or redirects to the creation flow if necessary.
 * 
 * @param {object} obj - An object containing the userId
 * @param {string} obj.userId - The ID of the user creating the home
 */
export async function createAirChezBibiHome({userId}:{userId:string}) {
    /**
     * Find the most recent home record associated with the provided userId.
     * The query is ordered by the createdAt timestamp in descending order.
     */
    const data = await prisma.home.findFirst({
        where:{
            userId: userId,
        },
        orderBy: {
            createdAt:"desc",
        },
    });

    /**
     * If no home record is found, create a new one and redirect to the structure creation page.
     */
    if(data === null) {
        const data = await prisma.home.create({
            data: {
                userId:userId,
            },
        });
        return redirect(`/create/${data.id}/structure`);
    } 
    /**
     * If a home record is found, check its status and redirect to the appropriate creation page.
     */
    else if(!data.addedCategory &&!data.addedDescription &&!data.addedLocation) {
        return redirect(`/create/${data.id}/structure`);
    } 
    else if (data.addedCategory &&!data.addedDescription) {
        return redirect(`/create/${data.id}/description`);
    } else if (
        data.addedCategory &&
        data.addedDescription &&
        !data.addedLocation
      ) {
        return redirect(`/create/${data.id}/address`);
      } else if (
        data.addedCategory &&
        data.addedDescription &&
        data.addedLocation
      ) {
        const data = await prisma.home.create({
          data: {
            userId: userId,
          },
        });
    
        return redirect(`/create/${data.id}/structure`);
      }
}


/**
 * Creates a new category page.
 * 
 * @param {FormData} formData - A FormData object containing the category name and home ID
 */
export async function createCategoryPage(formData:FormData){
    /**
     * Extract the category name and home ID from the FormData object.
     */
    const categoryName = formData.get("categoryName") as string;
    const homeId = formData.get("homeId") as string;
    
    /**
     * Update the corresponding home record with the new category name and set addedCategory to true.
     */
    const data = await prisma.home.update({
        where: {
            id: homeId,
        },
        data: {
            categoryName: categoryName,
            addedCategory:true,
        }
    });
    return redirect(`/create/${homeId}/description`);
}

export async function CreateDescription (formData:FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price");
    const imageFile = formData.get("image") as File;
    const homeId = formData.get("homeId") as string;

    const guestNumber = formData.get("guest") as string;
    const roomNumber = formData.get("room") as string;
    const bathroomNumber = formData.get("bathroom") as string;


    
const { data: imageData } = await supabase.storage.from("images").upload(`${imageFile.name}-${new Date()}`, imageFile, {
    cacheControl: "2592000",
    contentType: imageFile.type,
});


    const data = await prisma.home.update({
        where: {
            id: homeId
        },
        data: {
            title: title,
            description: description,
            price: Number(price),
            bedrooms: roomNumber,
            bathrooms: bathroomNumber,
            guests: guestNumber,
            photo: imageData?.path,
            addedDescription:true,

        }
    });

    return redirect(`/create/${homeId}/address`);
}


export async function createLocation (formData:FormData) {
    const homeId = formData.get("homeId") as string;
    const countryValue = formData.get("countryValue") as string;
    const data = await prisma.home.update({
        where: {
            id:homeId,
        },
        data:{
            addedLocation: true,
            country:countryValue,
        }
    })
    return redirect("/")
}