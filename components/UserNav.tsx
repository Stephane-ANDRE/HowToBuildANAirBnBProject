import { MenuIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";



export function UserNav () {
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
                        src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"                         
                        alt="user image" 
                        className="rounded-full h-10 w-10 hidden lg:block"
                        />
                </div>
            </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem>
                        <RegisterLink className="w-full">S'enregistrer</RegisterLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <LoginLink className="w-full">Se connecter</LoginLink>
                    </DropdownMenuItem>
                </DropdownMenuContent>
        </DropdownMenu>
    )
}