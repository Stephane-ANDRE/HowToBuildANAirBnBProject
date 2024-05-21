// Import necessary modules and components
import { ListingCard } from "@/components/ListingCard";
import { NoItems } from "@/components/NoItem";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

// Function to retrieve reservation data for a user
async function getData(userId: string) {
    const data = await prisma.reservation.findMany({
        where: {
            userId: userId
        },
        select: {
            id: true, // Add reservation id to the selection
            Home: {
                select: {
                    id: true,
                    country: true,
                    photo: true,
                    description: true,
                    price: true,
                    Favorite: {
                        where: {
                            userId: userId,
                        },
                    },
                },
            },
        },
    });

    return data;
};

// Default export for the ReservationRoute component
export default async function ReservationRoute() {
    // Get user session data
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // Redirect to homepage if user is not authenticated
    if (!user?.id) return redirect("/");

    // Retrieve reservation data for the user
    const data = await getData(user.id);

    // Render the section displaying user's reservations
    return (
        <section className="container mx-auto px-5 lg:px-10 mt-10">
            <h2 className="text-3xl font-semibold tracking-tight">Your Reserved Homes</h2>

            {/* Check if there are no reservations */}
            {data.length === 0 ? (
                <NoItems 
                    title="No reservations yet?? 🧐"
                    description="Add some... have fun! 🥳"
                />
            ) : (
                // Render the list of reserved homes
                <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-8 mt-8">
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
                            favoriteId={item.Home?.Favorite[0]?.id as string}
                            isInFavoriteList={item.Home?.Favorite.length as number > 0 ? true : false} 
                            // Set hasReservation to true to display the reservation cancellation button
                            hasReservation={true} 
                            // Pass the reservation id
                            reservationId={item.id} 
                        />
                    ))}
                </div>
            )}
        </section>
    )
}
