import { Skeleton } from "@/components/ui/skeleton";

// Define the HomePageLoading component
export default function HomePageLoading() {
    return (
        // Container with auto margins and top margin
        <div className="w-[75%] mx-auto mt-10">
            {/* Skeleton for a short horizontal line */}
            <Skeleton className="h-4 w-1/3"/>
            
            {/* Skeleton for a rectangular block */}
            <Skeleton className="w-full h-[550px] mt-5" />
            
            {/* Flex container with gap between items */}
            <div className="mt-8 flex justify-between gap-x-24">
                {/* Left column */}
                <div className="w-2/3">
                    {/* Skeleton for a short horizontal line */}
                    <Skeleton className="h-4 w-1/3"/>
                    
                    {/* Skeleton for another short horizontal line */}
                    <Skeleton className="h-4 w-1/3 mt-3"/>
                </div>
                
                {/* Right column */}
                <div className="w-1/3">
                    {/* Skeleton for a rectangular block */}
                    <Skeleton className="w-full h-72" />
                </div>
            </div>
        </div>
    );
}
