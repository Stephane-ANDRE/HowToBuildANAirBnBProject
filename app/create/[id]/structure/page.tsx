/* eslint-disable react/no-unescaped-entities */

// Import necessary modules and components
import { createCategoryPage } from "@/app/actions";
import CreationBottomBar from "@/components/CreationBottomBar";
import { SelectedCategory } from "@/components/SelectedCategory";

// Define the StructureRoute component
export default function StructureRoute({params}: {params:{id:string}}) {
    return (
        <>
            {/* Title Section */}
            <div className="w-3/5 mx-auto">
                <h2 
                className="text-3xl
                font-semibold
                tracking-tight
                transition-colors">
                Qu'est-ce qui correspont le mieux à ta caze?
                </h2>
            </div>

            {/* Form Section */}
            <form action={createCategoryPage}>
                {/* Hidden input field to store homeId */}
                <input type="hidden" name="homeId" value={params.id} />

                {/* SelectedCategory component */}
                <SelectedCategory />
              
                {/* Bottom bar for navigation */}
                <CreationBottomBar />
            </form>
        </>
    )
}