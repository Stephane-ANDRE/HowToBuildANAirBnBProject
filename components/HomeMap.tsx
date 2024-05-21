import dynamic from "next/dynamic";
import { Skeleton } from "./ui/skeleton";

// This component represents a dynamic loading map component for the home page.
export function HomeMap({ locationValue }: { locationValue: string }) {
    // Lazy loading of the Map component using dynamic import
    const LazyMap = dynamic(() => import("@/components/Map"), {
        ssr: false, // Disable server-side rendering for the dynamic component
        // Render a Skeleton component while the map component is loading
        loading: () => <Skeleton className="h-[50vh] w-full" />,
    });

    // Render the LazyMap component with the provided location value
    return <LazyMap locationValue={locationValue} />;
}
