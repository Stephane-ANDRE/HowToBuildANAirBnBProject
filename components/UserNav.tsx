/* eslint-disable @next/next/no-img-element */
import { MenuIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import {RegisterLink, LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Link from "next/link";
import { createAirChezBibiHome } from "@/app/actions";



export async function UserNav () {
    const { getUser} = getKindeServerSession();
    const user = await getUser ();

    const createHomeWithId = createAirChezBibiHome.bind(null, {
        userId: user?.id as string,
    });
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="
                rounded-full
                border
                px-2
                py-2
                lg:px-4
                lg:py-2
                flex
                items-center
                gap-x-3
                ">
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" />
                        <img
                        src={
                            user?.picture ?? "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
                        }                         
                        alt="user image" 
                        className="rounded-full h-10 w-10 hidden lg:block"
                        />
                </div>
            </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                    {user ? (
                         <>
                         <DropdownMenuItem>
                         <form action={createHomeWithId} className="w-full">
                            <button type="submit" className="w-full text-start">
                                AirchezBibi..ta caze
                            </button>
                         </form>
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                         <Link href="/my-homes" className="w-full">Mes cazes
                         </Link>
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                         <Link href="/my-favorites" className="w-full">Mes favories
                         </Link>
                         </DropdownMenuItem>
                         <DropdownMenuItem>
                         <Link href="/reservations" className="w-full">Mes réservations
                         </Link>
                         </DropdownMenuItem>
                         <DropdownMenuSeparator />
                     <DropdownMenuItem>
                         <LogoutLink className="w-full">Se déconnecter</LogoutLink>
                     </DropdownMenuItem>
                         </>
                    ): (
                        <> 
                        <DropdownMenuItem>
                        <RegisterLink className="w-full">S'enregistrer</RegisterLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LoginLink className="w-full">Se connecter</LoginLink>
                    </DropdownMenuItem>
                        </>
                    )}
                </DropdownMenuContent>
        </DropdownMenu>
    )
}