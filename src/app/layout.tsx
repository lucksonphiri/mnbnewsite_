import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
export const metadata: Metadata = { title: "MNB College", description: "MNB College official website" };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><SiteChrome>{children}</SiteChrome></body></html>}
