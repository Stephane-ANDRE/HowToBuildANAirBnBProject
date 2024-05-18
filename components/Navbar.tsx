import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "../../airchezbibi/public/logo-desktop.png";
import MobileLogo from "../../airchezbibi/public/logo-mobile.webp";
import { UserNav } from "./UserNav";
import { SearchBarModelComponent } from "./SearchBarComponent";

export function Navbar () {
    return (
        <nav className="w-full border-b">
            <div className="
            flex 
            items-center 
            justify-between 
            container 
            mx-auto 
            px-5 
            lg:px-10 
            py-5">
                <Link href="/">
                    <Image src={DesktopLogo} alt="Desktop AirChezBibi logo" className="w-32 hidden lg:block" />
                    <Image src={MobileLogo} alt="Mobile AirChezBibi logo" className="block lg:hidden w-12"/>
               </Link>
               <SearchBarModelComponent />
               <UserNav />
            </div>
        </nav>
    )
}