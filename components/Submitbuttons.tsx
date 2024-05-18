"use client"


import { useFormStatus } from "react-dom";
import {Button} from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";

export function CreationSubmit () {
    const {pending} = useFormStatus ()
    return(
        <>
        {pending ? (
            <Button disabled size="lg"> 
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Patience copain ou copine
            </Button>
        ): (
            <Button type="submit" size="lg"> Suivant 
            </Button>
        )}
        </>
    )
}

export function AddToFavoriteButton() {
    const {pending} = useFormStatus ()
    return (
                <>
                {pending ? (
<Button variant="outline" size="icon" disabled className="bg-primary-foreground">
    <Loader2 className="h-4 w-4 animate-spin text-primary"/>
</Button>
                ): (
<Button variant="outline" size="icon" className="bg-primary-foreground" type="submit">
    <Heart className="w-4 h-4" />
</Button>
                ) }
                </>
    )
}

export function DeleteFromFavoriteButton () {
    const {pending} = useFormStatus ()
    return (
                <>
                {pending ? (
<Button variant="outline" size="icon" disabled className="bg-primary-foreground">
    <Loader2 className="h-4 w-4 animate-spin text-primary"/>
</Button>
                ): (
<Button variant="outline" size="icon" className="bg-primary-foreground" type="submit">
    <Heart className="w-4 h-4 text-primary" fill="#E21C49" />
</Button>
                ) }
                </>
    )
};

export function ReservationSubmitButton () {
    const {pending} = useFormStatus ()

    return (
        <>
        {pending ? (
            <Button className="w-full" disabled>
                <Loader2 className="h-4 w-4 animate-spin mr-2"/> Patiente l'ami(e)...
            </Button>
        ): (
            <Button className="w-full" type="submit">Faites une réservation !</Button>
        )}
        </>
    )
}