"use client";

import { categoryItems } from "@/app/lib/categoryItems"; // Importing categoryItems data
import { Card, CardHeader } from "@/components/ui/card"; // Importing Card and CardHeader components
import Image from "next/image"; // Importing Image component from Next.js
import { useState } from "react"; // Importing useState hook from React

/**
 * Component for selecting a category.
 */
export function SelectedCategory() {
    // State for managing the selected category
    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined);

    // Return JSX
    return (
        <div className="grid grid-cols-4 gap-8 mt-10 w-3/5 mx-auto mb-36">
            {/* Hidden input field to store the selected category */}
            <input type="hidden" name="categoryName" value={selectedCategory as string} />
            {/* Mapping through each category item */}
            {categoryItems.map((item) => (
                <div key={item.id} className="cursor-pointer">
                    {/* Card component for displaying each category */}
                    <Card
                        // Adding border style if the category is selected
                        className={selectedCategory === item.name ? "border-primary border-2" : ""}
                        onClick={() => setSelectedCategory(item.name)}
                    >
                        {/* Card header containing category image and title */}
                        <CardHeader>
                            {/* Displaying category image */}
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                height={32}
                                width={32}
                                className="w-8 h-8"
                            />
                            {/* Displaying category title */}
                            <h3 className="font-medium">{item.title}</h3>
                        </CardHeader>
                    </Card>
                </div>
            ))}
        </div>
    );
}
