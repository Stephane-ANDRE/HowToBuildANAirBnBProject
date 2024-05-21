import { File, FileQuestion } from "lucide-react";

// Interface defining the props for the NoItems component
interface NoItemsProps {
    title: string;
    description: string;
}

// NoItems component representing the display when no items are available
export function NoItems({ description, title }: NoItemsProps) {
    return (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10">
            {/* Icon representing no items */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <FileQuestion className="h-10 w-10 text-primary" />
            </div>
            {/* Title and description */}
            <div>
                <h2 className="mt-6 text-xl font-semibold">{title}</h2>
                <p className="mt-2 text-center text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
        </div>
    );
}
