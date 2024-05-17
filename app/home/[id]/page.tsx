/* eslint-disable @next/next/no-img-element */

import prisma from "@/app/lib/db";
import { useCountries } from "@/app/lib/getCountries";
import { CategoryShowcase } from "@/components/CategoryShowcase";
import { HomeMap } from "@/components/HomeMap";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

async function getData(homeId:string) {
    const data = await prisma.home.findUnique({
        where: {
            id:homeId,
        },
        select: {
            photo: true,
            description: true,
            guests:true,
            bedrooms:true,
            bathrooms:true,
            title:true,
            categoryName:true,
            price:true,
            country:true,
            User: {
                select:{
                    profileImage:true,
                    firstname:true
                }
            }
        },
    });

    return data;
};

export default  async function HomeRoute ({params,}:{params:{id: string}}) {

    const data = await getData(params.id);
    const {getCountryByValue} = useCountries()
    const country = getCountryByValue(data?.country as string)

    return (
        <div className="w-[75%] mx-auto mt-10 mb-12">
            <h1 className="font-medium text-2xl mb-5">{data?.title}</h1>
            <div className="relative h-[550px]">
                <Image 
                    alt="Image of home" 
                    src={`https://xghgqaavcxcqszppdaxs.supabase.co/storage/v1/object/public/images/${data?.photo}`}
                    fill 
                    className="rounded-lg h-full object-cover w-full"
                    />
            </div>
                <div className="flex justify-between gap-4-24 mt-8">
                    <div className="w-2/3">
                        <h2 className="text-xl font-medium">
                        {country?.flag} {country?.label} / {country?.region}
                        </h2>
                            <div className="flex gap-x-2 text-muted-foreground">
                                <p>{data?.guests} invité(s)</p> *<p>{data?.bedrooms} chambre(s)</p> *<p>{data?.bathrooms} salle(s) de bain</p> 
                            </div>
                                <div className="flex items-center mt-6">
                                    <img src={data?.User?.profileImage ?? "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"} 
                                    alt="profil user image"
                                    className="w-11 h-11 rounded-full" />
                                    <div className="flex flex-col ml-4 ">
                                        <h3 className="font-medium"> Hôte: {data?.User?.firstname}</h3>
                                    </div>
                                </div>
                                <Separator className="my-7" />
                                <CategoryShowcase categoryName={data?.categoryName as string} />
                                <Separator className="my-7" />
                                <p className="text-muted-foreground">
                                    {data?.description}
                                </p>
                                <Separator className="my-7" />
                                <HomeMap locationValue={country?.value as string} />
                    </div>
                </div>
        </div>
    )
}