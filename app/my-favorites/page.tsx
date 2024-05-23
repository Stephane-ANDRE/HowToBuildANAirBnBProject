// Import necessary modules and components
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "@/app/lib/db";
import { redirect } from "next/navigation";
import { NoItems } from "@/components/NoItem";
import { ListingCard } from "@/components/ListingCard";
//not keeping the cache
import {unstable_noStore as noStore} from "next/cache";

// Function to retrieve favorite data for a given user
async function getData(userId:string) {
    noStore()
    const data = await prisma?.favorite.findMany({
        where: {
            userId: userId,
        },
        select: {
            Home: {
                select: {
                    photo: true,
                    id: true,
                    Favorite: true,
                    price: true,
                    country: true,
                    description:true,
                }
            }
        }
    });
    return data;
}

// Default export for the FavoriteRoute component
export default async function FavoriteRoute () {
    // Get user session data
    const { getUser } = getKindeServerSession();
    const user = await getUser(); 

    // Redirect to homepage if user is not authenticated
    if (!user) return redirect("/");

    // Retrieve favorite data for the authenticated user
    const data = await getData(user.id);

    // Render favorite listings section
    return (
        <section className="container mx-auto px-5 lg:px-10 mt-10">
            <h2 className="text-3xl font-semibold tracking-tight"> Tes cazes favories</h2>
            {/* Check if there are no favorite items */}
            {data.length === 0 ? (
                <NoItems 
                    title="No favorites yet? 🧐"
                    description="Add some favorites and enjoy 🥳"
                />
            ) : (
                // Render the list of favorite listings
                <div className="
                    grid
                    lg:grid-cols-4
                    sm:grid-cols-2
                    md:grid-cols-3
                    grid-cols-1
                    gap-8
                    mt-8">
                    {data.map((item) => (
                        <ListingCard 
                            key={item.Home?.id}
                            description={item.Home?.description as string}
                            location={item.Home?.country as string}
                            pathName="/my-favorites"
                            homeId={item.Home?.id as string}
                            imagePath={item.Home?.photo as string}
                            price={item.Home?.price as number}
                            userId={user.id}
                            favoriteId={item.Home?.Favorite[0].id as string}
                            isInFavoriteList={item.Home?.Favorite.length as number > 0 ? true : false} 
                            hasReservation={false} 
                            reservationId={""} 
                        />
                    ))}
                </div>
            )}
        </section>
    );
}
