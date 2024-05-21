import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreationSubmit } from "@/components/Submitbuttons";

// This component represents the bottom bar for creation forms, providing options to cancel or submit the creation process.
export default function CreationBottomBar() {
    return (
        <div className="fixed w-full bottom-0 z-10 bg-white border-t h-24">
            <div className="flex items-center justify-between mx-auto px-5 lg:px-10 h-full">
                {/* Button to cancel the creation process */}
                <Button variant="secondary" size="lg" asChild>
                    {/* Link to navigate back to the home page */}
                    <Link href="/"> Cancel </Link>
                </Button>
                {/* Component to submit the creation */}
                <CreationSubmit />
            </div>
        </div>
    );
}
