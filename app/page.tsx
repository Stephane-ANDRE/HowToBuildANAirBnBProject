import { MapFilterItems } from "@/components/MapFilterItems";
import prisma from "@/app/lib/db";
import { ListingCard } from "@/components/ListingCard";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/SkeletonCard";
import { NoItems } from "@/components/NoItem";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
//in order to not keep the cache
import {unstable_noStore as noStore} from "next/cache";

// Asynchronous function to fetch data based on search parameters and user ID
async function getData({
  searchParams,
  userId
}: {
  userId: string | undefined,
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  //no cache kept
  noStore()
  // Query the database for homes that match the search criteria
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
      country: searchParams?.country ?? undefined,
      guests: searchParams?.guest ?? undefined,
      bedrooms: searchParams?.room ?? undefined,
      bathrooms: searchParams?.bathroom ?? undefined,
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        }
      }
    },
  });
  return data;
}

// Default export for the Home component, which handles rendering the main layout
export default function Home({
  searchParams,
}: { searchParams?: {
  filter?: string;
  country?: string;
  guest?: string;
  room?: string;
  bathroom?: string;
}; }) {
  return (
    <div className="container mx-auto px-5 lg:px-10">
      <MapFilterItems />
      {/* Suspense component for lazy loading */}
      <Suspense key={searchParams?.filter} fallback={<SkeletonLoading />}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

// Asynchronous function to display items based on search parameters
async function ShowItems({
  searchParams,
}: { searchParams?: {
  filter?: string;
  country?: string;
  guest?: string;
  room?: string;
  bathroom?: string;
}; }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({ searchParams: searchParams, userId: user?.id });
  return (
    <>
      {data.length === 0 ? (
        <NoItems
          description="Mais guette les autres catégories... ou propose ta caze 😚"
          title="Na point la caze  a ter là 😔"
        />
      ) : (
        <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {data.map((item) => (
            <ListingCard key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              price={item.price as number}
              location={item.country as string}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavoriteList={item.Favorite.length > 0 ? true : false}
              homeId={item?.id}
              pathName="/"
              hasReservation={false}
              reservationId={""}
            />
          ))}
        </div>
      )}
    </>
  );
}

// Function to display skeleton cards while data is loading
function SkeletonLoading() {
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}
