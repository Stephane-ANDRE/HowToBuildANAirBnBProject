/* eslint-disable react/no-unescaped-entities */
"use client";

import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "./ui/select";
import { useCountries } from "@/app/lib/getCountries";
import { HomeMap } from "./HomeMap";
import { Button } from "./ui/button";
import { CreationSubmit } from "./Submitbuttons";
import { Card, CardHeader } from "./ui/card";
import { Counter } from "./Counter";

/**
 * Component for the search bar model.
 */
export function SearchBarModelComponent() {
    // State for managing the current step and selected location value
    const [step, setStep] = useState(1);
    const [locationValue, setLocationValue] = useState("");

    // Custom hook to fetch all countries
    const { getAllCountries } = useCountries();

    /**
     * Renders the appropriate submit button based on the current step.
     * @returns The submit button component.
     */
    function SubmitButtonLocal() {
        if (step === 1) {
            return (
                <Button onClick={() => setStep(step + 1)} type="button">Next</Button>
            );
        } else if (step === 2) {
            return <CreationSubmit />;
        }
    }

    return (
        <Dialog>
            {/* Trigger element for the dialog */}
            <DialogTrigger asChild>
                <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
                    <div className="flex h-full divide-x font-medium">
                        <p className="px-4">Anywhere</p>
                        <p className="px-4">Anytime</p>
                        <p className="px-4">With whoever you want</p>
                    </div>
                    <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
                </div>
            </DialogTrigger>
            {/* Content of the dialog */}
            <DialogContent className="sm:max-w-[425px]">
                <form className="gap-4 flex flex-col">
                    {/* Hidden input field to store selected country */}
                    <input type="hidden" name="country" value={locationValue} />
                    {/* Conditionally render content based on the current step */}
                    {step === 1 ? (
                        // Step 1 content: Select country
                        <>
                            <DialogHeader>
                                <DialogTitle>Choose a country</DialogTitle>
                                <DialogDescription>Choose a country to see available homes</DialogDescription>
                            </DialogHeader>
                            {/* Dropdown for selecting country */}
                            <Select required onValueChange={(value) => setLocationValue(value)} value={locationValue}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose a country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Country</SelectLabel>
                                        {/* Render options for each country */}
                                        {getAllCountries().map((country) => (
                                            <SelectItem key={country.value} value={country.value}>
                                                {country.flag} {country.label} / {country.region}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {/* Render the map component */}
                            <HomeMap locationValue={locationValue} />
                        </>
                    ) : (
                        // Step 2 content: Select information
                        <>
                            <DialogHeader>
                                <DialogTitle>Select the information</DialogTitle>
                                <DialogDescription>From the following list</DialogDescription>
                            </DialogHeader>
                            {/* Card component for selecting guests, rooms, and bathrooms */}
                            <Card>
                                <CardHeader className="flex flex-col gap-y-5">
                                    {/* Counter component for selecting number of guests */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="underline font-medium">Guests</h3>
                                            <p className="text-muted-foreground text-sm">
                                                Maximum number of guests
                                            </p>
                                        </div>
                                        <Counter name="guest" />
                                    </div>
                                    {/* Counter component for selecting number of rooms */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="underline font-medium">Rooms</h3>
                                            <p className="text-muted-foreground text-sm">
                                                Number of rooms
                                            </p>
                                        </div>
                                        <Counter name="room" />
                                    </div>
                                    {/* Counter component for selecting number of bathrooms */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="underline font-medium">Bathrooms</h3>
                                            <p className="text-muted-foreground text-sm">
                                                Number of bathrooms
                                            </p>
                                        </div>
                                        <Counter name="bathroom" />
                                    </div>
                                </CardHeader>
                            </Card>
                        </>
                    )}
                    {/* Footer section with submit button */}
                    <DialogFooter>
                        <SubmitButtonLocal />
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
