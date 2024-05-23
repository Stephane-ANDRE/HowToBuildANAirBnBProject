import { Skeleton } from "@/components/ui/skeleton"; // Importing Skeleton component

/**
 * Component for rendering a skeleton loading card.
 */
export function SkeletonCard() {
    return (
        <div className="flex flex-col space-y-3">
            {/* Skeleton loading for card image */}
            <Skeleton className="h-72 w-full rounded-lg" />
            {/* Skeleton loading for card content */}
            <div className="space-y-2 flex flex-col">
                <Skeleton className="h-4 w-full" /> {/* Skeleton loading for content line 1 */}
                <Skeleton className="h-4 w-3/4" /> {/* Skeleton loading for content line 2 */}
                <Skeleton className="h-4 w-1/2" /> {/* Skeleton loading for content line 3 */}
            </div>
        </div>
    );
}
