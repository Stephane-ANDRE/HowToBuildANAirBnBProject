// Import necessary types and components from Next.js and other libraries
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next"

// Load the Inter font from Google Fonts
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the page
export const metadata: Metadata = {
  title: "AirChezBibi",
  description: "",
};

// Define the root layout component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Include the Navbar component */}
        <Navbar />
        {/* Render the children components */}
        {children}
      </body>
    </html>
  );
}
