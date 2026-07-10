"use client";
import { usePathname } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatbotPlaceholder from "@/components/ChatbotPlaceholder";
export default function SiteChrome({children}:{children:React.ReactNode}){const pathname=usePathname();const admin=pathname.startsWith('/admin');return <>{!admin&&<><TopBar/><Navbar/></>}{children}{!admin&&<><Footer/><ChatbotPlaceholder/></>}</>}
