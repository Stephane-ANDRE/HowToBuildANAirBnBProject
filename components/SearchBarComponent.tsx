/* eslint-disable react/no-unescaped-entities */
"use client";

import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@/components/ui/select";
import { useCountries } from "@/app/lib/getCountries";
import { HomeMap } from "@/components/HomeMap";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "@/components/Submitbuttons";
import { Card, CardHeader } from "@/components/ui/card";
import { Counter } from "@/components/Counter";

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
                <Button onClick={() => setStep(step + 1)} type="button">Suivant</Button>
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
                        <p className="px-4">Où tu veux</p>
                        <p className="px-4">Quand tu veux</p>
                        <p className="px-4">Avec qui tu veux</p>
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
                                <DialogTitle>Choisis un pays</DialogTitle>
                                <DialogDescription>Choisis un pays pour voir les cases disponibles</DialogDescription>
                            </DialogHeader>
                            {/* Dropdown for selecting country */}
                            <Select required onValueChange={(value) => setLocationValue(value)} value={locationValue}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Choose a country" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Pays</SelectLabel>
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
                                <DialogTitle>Choisis les options</DialogTitle>
                                <DialogDescription>De cette liste</DialogDescription>
                            </DialogHeader>
                            {/* Card component for selecting guests, rooms, and bathrooms */}
                            <Card>
                                <CardHeader className="flex flex-col gap-y-5">
                                    {/* Counter component for selecting number of guests */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="underline font-medium">Invités</h3>
                                            <p className="text-muted-foreground text-sm">
                                                Nombre d'invités au maximum
                                            </p>
                                        </div>
                                        <Counter name="guest" />
                                    </div>
                                    {/* Counter component for selecting number of rooms */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="underline font-medium">Pièces</h3>
                                            <p className="text-muted-foreground text-sm">
                                                Nombre de pièces
                                            </p>
                                        </div>
                                        <Counter name="room" />
                                    </div>
                                    {/* Counter component for selecting number of bathrooms */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <h3 className="underline font-medium">Salle de bain</h3>
                                            <p className="text-muted-foreground text-sm">
                                                Nombre de salle de bain
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
