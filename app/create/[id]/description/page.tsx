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
          Describe your house like never before!!
        </h2>
      </div>

      {/* Form Section */}
      <form action={CreateDescription}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">

          {/* Title Input */}
          <div className="flex flex-col gap-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              name="title"
              type="text"
              required
              placeholder="A short catchy title ..."
            />
          </div>

          {/* Description Textarea */}
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea
              name="description"
              required
              placeholder="Describe your house..."
            />
          </div>

          {/* Price Input */}
          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input
              name="price"
              type="number"
              required
              placeholder="price per night in €"
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
                  <h3 className="underline font-medium">Guests</h3>
                  <p className="text-muted-foreground text-sm">
                    Maximum number of guests
                  </p>
                </div>
                <Counter name="guest" />
              </div>

              {/* Rooms Counter */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Rooms</h3>
                  <p className="text-muted-foreground text-sm">
                    Number of rooms
                  </p>
                </div>
                <Counter name="room" />
              </div>

              {/* Bathrooms Counter */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <h3 className="underline font-medium">Bathrooms</h3>
                  <p className="text-muted-foreground text-sm">
                    Number of bathrooms
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
