/* eslint-disable react/no-unescaped-entities */
"use client"


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


export function SearchBarModelComponent () {
    const [step, setStep] = useState(1)
    const [locationValue, setLocationValue] = useState("")

    const {getAllCountries} = useCountries()

    function SubmitButtonLocal() {
        if(step === 1) {
            return (
                <Button onClick={() => setStep(step +1)} type="button">Suivant</Button>
            );
        } else if(step === 2) {
            return <CreationSubmit />;
        }
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                <div className="rounded-full py-2 px-5 border flex items-center cursor-pointer">
                    <div className=" flex h-full divide-x font-medium">
                        <p className="px-4">N'importe où</p>
                        <p className="px-4">N'importe quand</p>
                        <p className="px-4">Avec qui vous voulez</p>
                    </div>
                            <Search className="bg-primary text-white p-1 h-8 w-8 rounded-full" />
                </div>
            </DialogTrigger>
            <DialogContent className="sm: max-w-[425px]">
                <form className="gap-4 flex flex-col">
                    <input type="hidden"name="country" value={locationValue}/>
                    {step === 1 ? (
                        <>
                        <DialogHeader>
                            <DialogTitle> Choisis un pays</DialogTitle>
                            <DialogDescription> Choisis un pays pour voir les cases disponibles</DialogDescription>
                        </DialogHeader>

                        <Select required onValueChange={(value) => setLocationValue(value)} value={locationValue}>
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
                    <HomeMap locationValue={locationValue}/>
                        </>
                    ): (
                        <>
                        <DialogHeader>
                            <DialogTitle> Sélectionne les informations</DialogTitle>
                            <DialogDescription> Parmi la liste suivante</DialogDescription>
                        </DialogHeader>
                        <Card>
              <CardHeader className="flex flex-col gap-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="underline font-medium">Invités</h3>
                    <p className="text-muted-foreground text-sm">
                      Le nombre d'invités maximum
                    </p>
                  </div>
  
                  <Counter name="guest" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="underline font-medium">Chambres</h3>
                    <p className="text-muted-foreground text-sm">
                      Nombre de chambres
                    </p>
                  </div>
  
                  <Counter name="room" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <h3 className="underline font-medium">Salle de bain</h3>
                    <p className="text-muted-foreground text-sm">
                      Nombre de salles de bains
                    </p>
                  </div>
  
                  <Counter name="bathroom" />
                </div>
              </CardHeader>
            </Card>
                        </>
                    )}
                    <DialogFooter>
                        <SubmitButtonLocal />
                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}