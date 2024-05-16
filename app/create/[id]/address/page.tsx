"use client"

import { createLocation } from "@/app/actions";
import { useCountries } from "@/app/lib/getCountries";
import CreationBottomBar from "@/components/CreationBottomBar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useState } from "react";



export default function AddressRoute({params}: {params:{id:string}}) {

    const {getAllCountries} = useCountries();
    const [locationValue, setLocationValue] = useState("")

    const LazyMap = dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading:() => <Skeleton className="h-[50vh] w-full" />
    })


    return (
        <>
        <div className="w-3/5 mx-auto mb-36">
            <h1 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
                Où se situe ta belle caze?
            </h1>
        </div>
        <form action={createLocation}>
            <input type="hidden" name="homeId" value={params.id} />
            <input type="hidden" name="countryValue" value={locationValue} />
            <div className="w-3/5 mx-auto">
                <div className="mb-5">
                    <Select required onValueChange={(value) => setLocationValue(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choisis un pays" />
                        </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>
                                        Pays
                                    </SelectLabel>
                                    {getAllCountries().map((country)=>(
                                        <SelectItem key={country.value} value={country.value}>
                                            {country.flag} {country.label} / {country.region}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                    </Select>
                </div>
                <LazyMap locationValue={locationValue}/>
            </div>
            <CreationBottomBar />
        </form>
        </>
    )
}