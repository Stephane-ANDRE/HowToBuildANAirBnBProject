"use client";

import { useFormStatus } from "react-dom"; // Importing useFormStatus hook from react-dom
import { Button } from "@/components/ui/button"; // Importing Button component
import { Heart, Loader2 } from "lucide-react"; // Importing Heart and Loader2 icons from lucide-react

/**
 * Component for rendering the submit button for creation.
 * Displays a loader when pending.
 */
export function CreationSubmit() {
    const { pending } = useFormStatus(); // Getting the pending status from useFormStatus hook
    return (
        <>
            {pending ? ( // Display loader if pending
                <Button disabled size="lg">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Patience copain ou copine
                </Button>
            ) : ( // Display regular button if not pending
                <Button type="submit" size="lg">
                    Suivant
                </Button>
            )}
        </>
    );
}

/**
 * Component for rendering the button to add to favorites.
 * Displays a loader when pending.
 */
export function AddToFavoriteButton() {
    const { pending } = useFormStatus(); // Getting the pending status from useFormStatus hook
    return (
        <>
            {pending ? ( // Display loader if pending
                <Button variant="outline" size="icon" disabled className="bg-primary-foreground">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </Button>
            ) : ( // Display regular button if not pending
                <Button variant="outline" size="icon" className="bg-primary-foreground" type="submit">
                    <Heart className="w-4 h-4" />
                </Button>
            )}
        </>
    );
}

/**
 * Component for rendering the button to delete from favorites.
 * Displays a loader when pending.
 */
export function DeleteFromFavoriteButton() {
    const { pending } = useFormStatus(); // Getting the pending status from useFormStatus hook
    return (
        <>
            {pending ? ( // Display loader if pending
                <Button variant="outline" size="icon" disabled className="bg-primary-foreground">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                </Button>
            ) : ( // Display regular button if not pending
                <Button variant="outline" size="icon" className="bg-primary-foreground" type="submit">
                    <Heart className="w-4 h-4 text-primary" fill="#E21C49" />
                </Button>
            )}
        </>
    );
}

/**
 * Component for rendering the reservation submit button.
 * Displays a loader when pending.
 */
export function ReservationSubmitButton() {
    const { pending } = useFormStatus(); // Getting the pending status from useFormStatus hook
    return (
        <>
            {pending ? ( // Display loader if pending
                <Button className="w-full" disabled>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" /> Patiente l'ami(e)...
                </Button>
            ) : ( // Display regular button if not pending
                <Button className="w-full" type="submit">Faites une réservation !</Button>
            )}
        </>
    );
}

/**
 * Component for rendering the cancel reservation button.
 * Displays a loader when pending.
 */
export function CancelReservationButton() {
    const { pending } = useFormStatus(); // Getting the pending status from useFormStatus hook
    return (
        <>
            {pending ? ( // Display loader if pending
                <Button className="w-full" disabled>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" /> Annulation en cours...
                </Button>
            ) : ( // Display regular button if not pending
                <Button className="w-full" type="submit">Annuler la réservation</Button>
            )}
        </>
    );
}
