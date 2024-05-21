"use client"

// Import necessary modules and components
import { createLocation } from "@/app/actions";
import { useCountries } from "@/app/lib/getCountries";
import CreationBottomBar from "@/components/CreationBottomBar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import dynamic from "next/dynamic";
import { useState } from "react";

// Define the AddressRoute component
export default function AddressRoute({params}: {params:{id:string}}) {

    // Use the custom hook to get country data
    const {getAllCountries} = useCountries();
    // Use the useState hook to manage the selected location value
    const [locationValue, setLocationValue] = useState("")

    // Dynamically import the Map component, with server-side rendering disabled
    const LazyMap = dynamic(() => import("@/components/Map"), {
        ssr: false,
        loading: () => <Skeleton className="h-[50vh] w-full" />
    })

    return (
        <>
        <div className="w-3/5 mx-auto mb-36">
            <h1 className="text-3xl font-semibold tracking-tight transition-colors mb-10">
                Where is your beautiful house located?
            </h1>
        </div>
        {/* Form to handle the location submission */}
        <form action={createLocation}>
            <input type="hidden" name="homeId" value={params.id} />
            <input type="hidden" name="countryValue" value={locationValue} />
            <div className="w-3/5 mx-auto">
                <div className="mb-5">
                    {/* Select component for choosing a country */}
                    <Select required onValueChange={(value) => setLocationValue(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Choose a country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>
                                    Country
                                </SelectLabel>
                                {/* Map through the list of countries and create a SelectItem for each */}
                                {getAllCountries().map((country) => (
                                    <SelectItem key={country.value} value={country.value}>
                                        {country.flag} {country.label} / {country.region}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {/* Render the dynamically imported Map component */}
                <LazyMap locationValue={locationValue} />
            </div>
            {/* Render the bottom bar component */}
            <CreationBottomBar />
        </form>
        </>
    )
}
