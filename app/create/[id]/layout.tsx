import type { ReactNode } from "react";

// Define the LayoutCreation component
export default function LayoutCreation({ children }: { children: ReactNode }) {
    return (
        // Render children inside a div with top margin
        <div className="mt-10">
            {children}
        </div>
    );
}
