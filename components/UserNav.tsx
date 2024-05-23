/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */ // Disabling eslint rule for img elements

import { MenuIcon } from "lucide-react"; // Importing MenuIcon from lucide-react
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"; // Importing dropdown menu components
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"; // Importing authentication components
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"; // Importing server-side session utility
import Link from "next/link"; // Importing Link component from Next.js
import { createAirChezBibiHome } from "@/app/actions"; // Importing action to create AirChezBibi home

/**
 * Component for rendering user navigation.
 * Displays user profile dropdown menu.
 */
export async function UserNav() {
    const { getUser } = getKindeServerSession(); // Getting user information from server session
    const user = await getUser(); // Fetching user data

    // Function to create a home for AirChezBibi with user ID
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
                    <MenuIcon className="w-6 h-6 lg:w-5 lg:h-5" /> {/* Displaying menu icon */}
                    <img
                        src={
                            user?.picture ?? "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg" // Displaying user image or default avatar
                        }
                        alt="user image" // Image alt text
                        className="rounded-full h-10 w-10 hidden lg:block" // Image styling
                    />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
                {user ? ( // Displaying menu items if user is authenticated
                    <>
                        <DropdownMenuItem>
                            <form action={createHomeWithId} className="w-full">
                                <button type="submit" className="w-full text-start">AirchezBibi..ta caze</button> {/* Button to create AirChezBibi home */}
                            </form>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/my-homes" className="w-full">Mes cazes</Link> {/* Link to user's homes */}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/my-favorites" className="w-full">Mes favories</Link> {/* Link to user's favorites */}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="/reservations" className="w-full">Mes réservations</Link> {/* Link to user's reservations */}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator /> {/* Separator */}
                        <DropdownMenuItem>
                            <LogoutLink className="w-full">Se déconnecter</LogoutLink> {/* Logout link */}
                        </DropdownMenuItem>
                    </>
                ) : ( // Displaying authentication links if user is not authenticated
                    <> 
                        <DropdownMenuItem>
                            <RegisterLink className="w-full">S'enregistrer</RegisterLink> {/* Register link */}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <LoginLink className="w-full">Se connecter</LoginLink> {/* Login link */}
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
