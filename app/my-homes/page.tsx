// Import necessary modules and components
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { NoItems } from "@/components/NoItem";
import { ListingCard } from "@/components/ListingCard";

// Function to retrieve data for user's homes
async function getData(userId:string) {
    const data = await prisma?.home.findMany({
        where: {
            userId: userId,
            addedCategory: true,
            addedDescription: true,
            addedLocation: true,
        },
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
        orderBy: {
            createdAt: "desc",
        }
    });
    return data;
};

// Default export for the MyHomes component
export default async function MyHomes() {
    // Get user session data
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // Redirect to homepage if user is not authenticated
    if (!user) {
        return redirect("/");
    }

    // Retrieve data for the user's homes
    const data = await getData(user.id);

    // Render the user's homes section
    return (
        <section className="container mx-auto px-5 lg:px-10 mt-10">
            <h2 className="text-3xl font-semibold tracking-tight">My Homes</h2>

            {/* Check if there are no homes */}
            {data.length === 0 ? (
                <NoItems title="No homes registered yet 🥺" description="Add some... or have a bunch 🙃" />
            ) : (
                // Render the list of user's homes
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
                            key={item.id}
                            description={item.description as string}
                            location={item.country as string}
                            pathName="/my-homes"
                            homeId={item.id as string}
                            imagePath={item.photo as string}
                            price={item.price as number}
                            userId={user.id}
                            favoriteId={item.Favorite[0]?.id as string}
                            isInFavoriteList={item.Favorite.length as number > 0 ? true : false} 
                            hasReservation={false} 
                            reservationId={""} 
                        />
                    ))}
                </div>
            )}
        </section>
    )
}
