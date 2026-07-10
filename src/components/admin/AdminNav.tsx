"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Image, Newspaper, CalendarDays, Banknote, LogOut } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/media", label: "Images & Videos", icon: Image },
  { href: "/admin/news", label: "News", icon: Newspaper },
  { href: "/admin/events", label: "Events", icon: CalendarDays },
  { href: "/admin/fees", label: "Fees", icon: Banknote },
];

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();
  if (pathname === "/admin/login") return null;
  async function logout() { await fetch("/api/admin/logout", { method: "POST" }); router.push("/admin/login"); router.refresh(); }
  return (
    <aside className="w-full lg:w-72 bg-[var(--mnb-navy)] text-white p-5 lg:min-h-screen">
      <h2 className="text-2xl font-black">MNB Admin</h2>
      <p className="text-blue-200 text-sm mt-1">Website content manager</p>
      <nav className="mt-7 grid gap-2">
        {links.map(({href,label,icon:Icon}) => (
          <Link key={href} href={href} className={`flex items-center gap-3 rounded-xl px-4 py-3 ${pathname===href ? "bg-[var(--mnb-gold)] text-[var(--mnb-navy)]" : "hover:bg-blue-900"}`}>
            <Icon size={19}/>{label}
          </Link>
        ))}
        <button onClick={logout} className="mt-4 flex items-center gap-3 rounded-xl px-4 py-3 text-left hover:bg-red-700"><LogOut size={19}/>Logout</button>
      </nav>
    </aside>
  );
}
