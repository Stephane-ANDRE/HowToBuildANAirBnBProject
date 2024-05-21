import { categoryItems } from "@/app/lib/categoryItems";
import Image from "next/image";

// This function component showcases a specific category's image, title, and description.
export function CategoryShowcase({ categoryName }: { categoryName: string }) {
    // Find the category item that matches the provided category name.
    const category = categoryItems.find((item) => item.name === categoryName);

    // Return a JSX element that displays the category image, title, and description.
    return (
        <div className="flex items-center">
            <Image 
                // Use the imageUrl from the matched category item for the image source.
                src={category?.imageUrl as string} 
                alt="category image" 
                width={44} height={44}
            />
            <div className="flex flex-col ml-4">
                <h3 className="font-medium">{category?.title}</h3>
                <p className="text-sm text-muted-foreground">{category?.description}</p>
            </div>
        </div>
    );
}
