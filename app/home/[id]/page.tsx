/* eslint-disable @next/next/no-img-element */

// Imports
import { createReservation } from "@/app/actions";
import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { HomeMap } from "@/components/HomeMap";
import { SelectCalendar } from "@/components/SelectCalendar";
import { ReservationSubmitButton } from "@/components/Submitbuttons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

// Function to fetch data for a specific home
async function getData(homeId: string) {
    const data = await prisma.home.findUnique({
        where: {
            id: homeId,
        },
        select: {
            photo: true,
            description: true,
            guests: true,
            bedrooms: true,
            bathrooms: true,
            title: true,
            categoryName: true,
            price: true,
            country: true,
            Reservation: {
                where: {
                    homeId: homeId,
                }
            },
            User: {
                select: {
                    profileImage: true,
                    firstname: true
                }
            }
        },
    });

    return data;
}

// Default function for the HomeRoute component
export default async function HomeRoute({ params }: { params: { id: string } }) {
    // Fetch data for the specified home
    const data = await getData(params.id);

    // Get country data using the useCountries hook
    const { getCountryByValue } = useCountries();
    const country = getCountryByValue(data?.country as string);

    // Get user data using the getKindeServerSession hook
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    // Render the component
    return (
        <div className="w-[75%] mx-auto mt-10 mb-12">
            {/* Home title */}
            <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>

            {/* Image of the home */}
            <div className="relative h-[550px]">
                <Image 
                    alt="Image of home" 
                    src={`https://xghgqaavcxcqszppdaxs.supabase.co/storage/v1/object/public/images/${data?.photo}`}
                    fill 
                    className="rounded-lg h-full object-cover w-full"
                />
            </div>

            {/* Details about the home */}
            <div className="flex justify-between gap-4-24 mt-8">
                <div className="w-2/3">
                    {/* Country flag, label, and region */}
                    <h2 className="text-xl font-medium">
                        {country?.flag} {country?.label} / {country?.region}
                    </h2>

                    {/* Guest, bedroom, and bathroom details */}
                    <div className="flex gap-x-2 text-muted-foreground">
                        <p>{data?.guests} invité(s)</p> * <p>{data?.bedrooms} pièce(s)</p> * <p>{data?.bathrooms} salle(s) de bain(s)</p> 
                    </div>

                    {/* Host information */}
                    <div className="flex items-center mt-6">
                        <img 
                            src={data?.User?.profileImage ?? "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} 
                            alt="profil user image"
                            className="w-11 h-11 rounded-full" 
                        />
                        <div className="flex flex-col ml-4 ">
                            <h3 className="font-medium"> Host: {data?.User?.firstname}</h3>
                        </div>
                    </div>

                    {/* Separator */}
                    <Separator className="my-7" />

                    {/* Category showcase */}
                    <CategoryShowcase categoryName={data?.categoryName as string} />

                    {/* Separator */}
                    <Separator className="my-7" />

                    {/* Description */}
                    <p className="text-muted-foreground">{data?.description}</p>

                    {/* Separator */}
                    <Separator className="my-7" />

                    {/* Home map */}
                    <HomeMap locationValue={country?.value as string} />
                </div>

                {/* Reservation form */}
                <form action={createReservation}>
                    {/* Hidden input fields for homeId and userId */}
                    <input  type="hidden" name="homeId" value={params.id} />
                    <input  type="hidden" name="userId" value={user?.id} />

                    {/* Calendar for selecting reservation dates */}
                    <SelectCalendar reservation={data?.Reservation} />

                    {/* Render ReservationSubmitButton if user is logged in, otherwise render login link */}
                    {user?.id ? (
                        <ReservationSubmitButton />
                    ) : (
                        <Button className="w-full" asChild>
                            <Link href="/api/auth/login"> Faire une réservation
                            </Link>
                        </Button>
                    )}
                </form>
            </div>
        </div>
    )
}