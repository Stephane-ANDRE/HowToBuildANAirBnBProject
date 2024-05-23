import Image from "next/image";
import Link from "next/link";
import DesktopLogo from "@/public/logo-desktop.png";
import MobileLogo from "@/public/logo-mobile.webp";
import { UserNav } from "@/components/UserNav";
import { SearchBarModelComponent } from "@/components/SearchBarComponent";

// Navbar component representing the navigation bar
export function Navbar() {
    return (
        <nav className="w-full border-b">
            <div className="flex items-center justify-between container mx-auto px-5 lg:px-10 py-5">
                {/* Link to the home page */}
                <Link href="/">
                    {/* Desktop logo */}
                    <Image src={DesktopLogo} alt="Desktop AirChezBibi logo" className="w-32 hidden lg:block" />
                    {/* Mobile logo */}
                    <Image src={MobileLogo} alt="Mobile AirChezBibi logo" className="block lg:hidden w-12" />
                </Link>
                {/* SearchBarModelComponent for searching */}
                <SearchBarModelComponent />
                {/* UserNav component for user navigation */}
                <UserNav />
            </div>
        </nav>
    );
}
