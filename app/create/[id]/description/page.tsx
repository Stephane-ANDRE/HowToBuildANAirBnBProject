import { CreateDescription } from "@/app/actions";
import { Counter } from "@/components/Counter";
import CreationBottomBar from "@/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";



export default function DescriptionPage({params}:{params: {id: string}}) {
    return (
        <>
        <div className="w-3/5 mx-auto">
            <h1 className="text-3xl font-semibold tracking-tight transition-colors">Décris au mieux ta case!</h1>
        </div>
        <form action={CreateDescription}>
            <input type="hidden" name="homeId" value={params.id} />
            <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
                <div className="flex flex-col gap-y-2">
                    <Label>Titre de ta case</Label>
                    <Input name="title" type="text" required placeholder="En quelques mots..."/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Description de ta case</Label>
                   <Textarea name="description" required placeholder="Décris ta case s'il te plait..."/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Prix de ta case</Label>
                    <Input name="price" type="number" required placeholder="Prix par nuit en EUR" min={10}/>
                </div>
                <div className="flex flex-col gap-y-2">
                    <Label>Image</Label>
                    <Input name="image" type="file" required />
                </div>
                <Card>
                    <CardHeader className="flex flex-col gap-y-5">
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <h2 className="underline font-medium"> Invités</h2>
                                <p className="text-muted-foreground text-sm">Combien d'invités maximum ?</p>
                            </div>
                            <Counter name="guest" />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <h2 className="underline font-medium"> Pièces</h2>
                                <p className="text-muted-foreground text-sm">Combien il y a de pièces ?</p>
                            </div>
                            <Counter name="room" />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <h2 className="underline font-medium"> Salles de Bain</h2>
                                <p className="text-muted-foreground text-sm">Combien il y a de salles de bain </p>
                            </div>
                            <Counter name="bathroom" />
                        </div>
                    </CardHeader>
                </Card>
            </div>

            <CreationBottomBar />
    
        </form>
        </>
    )
}
      