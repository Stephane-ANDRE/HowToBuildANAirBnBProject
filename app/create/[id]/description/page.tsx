/* eslint-disable react/no-unescaped-entities */

// Import necessary modules and components
import { CreateDescription } from "@/app/actions";
import { Counter } from "@/components/Counter";
import CreationBottomBar from "@/components/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Define the DescriptionPage component
export default function DescriptionPage({
    params,
  }: {
    params: { id: string };
  }) 
{
  return (
    <>
      {/* Title Section */}
      <div className="w-3/5 mx-auto">
        <h2 className="text-3xl font-semibold tracking-tight transition-colors">
          Décris ta caze comme jamais !!!
        </h2>
      </div>

      {/* Form Section */}
      <form action={CreateDescription}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">

          {/* Title Input */}
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              name="title"
              type="text"
              required
              placeholder="Un titre accrocheur..."
            />
          </div>

          {/* Description Textarea */}
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              required
              placeholder="Décris ta caze..."
            />
          </div>

          {/* Price Input */}
          <div className="flex flex-col gap-y-2">
            <Label>Prix</Label>
            <Input
              name="price"
              type="number"
              required
              placeholder="prix par nuit en €"
              min={10}
            />
          </div>

          {/* Image Upload Input */}
          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input name="image" type="file" required />
          </div>

          {/* Additional Details Section */}
          <Card>
            <CardHeader className="flex flex-col gap-y-5">

              {/* Guests Counter */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Invités</h3>
                  <p className="text-muted-foreground text-sm">
                    Nombre d'invités au maximum
                  </p>
                </div>
                <Counter name="guest" />
              </div>

              {/* Rooms Counter */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Pièces</h3>
                  <p className="text-muted-foreground text-sm">
                    Nombre de pièces
                  </p>
                </div>
                <Counter name="room" />
              </div>

              {/* Bathrooms Counter */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Salles de bains</h3>
                  <p className="text-muted-foreground text-sm">
                    Nombre de salles de bains
                  </p>
                </div>
                <Counter name="bathroom" />
              </div>

            </CardHeader>
          </Card>
        </div>

        {/* Bottom Bar */}
        <CreationBottomBar />
      </form>
    </>
  );
}
