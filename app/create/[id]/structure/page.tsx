import { createCategoryPage } from "@/app/action";
import CreationBottomBar from "@/components/CreationBottomBar";
import { SelectedCategory } from "@/components/SelectedCategory";


export default function StructureRoute({params}: {params:{id:string}}) {
    return (
        <>
        <div className="w-3/5 mx-auto">
            <h2 
            className="text-3xl
            font-semibold
            tracking-tight
            transition-colors">
            Qu'est-ce qui correspond au mieux à ton logement?
            </h2>
        </div>
        <form action={createCategoryPage}>
        <input type="hidden" name="homeId" value={params.id} />
            <SelectedCategory />
          
            <CreationBottomBar />
        </form>
        </>
    )
}