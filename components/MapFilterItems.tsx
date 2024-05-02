"use client"

import { cn } from "@/lib/utils";
// Import modules and components:
// Importing category items
import { categoryItems } from "../app/lib/categoryItems"; 
// Next.js component for optimizing images
import Image from "next/image";
// Next.js component for client-side navigation 
import Link from "next/link"; 
// Next.js hooks for accessing search parameters and pathname
import { useSearchParams, usePathname } from "next/navigation"; 
// React hook for memoizing functions
import { useCallback } from "react"; 


// Define the MapFilterItems component
export function MapFilterItems() {
    // Get search parameters and pathname using Next.js hooks
    const searchParams = useSearchParams();
    const search = searchParams.get("filter");
    const pathname = usePathname();

    // Define a memoized function to create a query string
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        }, [searchParams]
    );

    // Render the component
    return (
        <div className="flex gap-x-10 mt-5 w-full overflow-x-scroll no-scrollbar">
            {categoryItems.map((item) => (
                // Map through category items and create a link for each item
                <Link
                className={cn( search === item.name 
                    ? "border-b-2 border-black pb-2 flex-shrink-0" 
                    : "opacity-70 flex-shrink-0",
                    "flex flex-col gap-y-3 items-center")} 
                key={item.id} 
                href={pathname + "?" + createQueryString("filter", item.name)}>
                    <div className="relative w-6 h-6">
                        {/* Display category image */}
                        <Image
                            src={item.imageUrl}
                            alt="Category image"
                            className="w-6 h-6"
                            width={24}
                            height={24}
                        />
                    </div>
                    {/* Display category title */}
                    <p className="text-xs font-medium">{item.title}</p>
                </Link>
            ))}
        </div>
    );
}
