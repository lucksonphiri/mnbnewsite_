import Link from "next/link";
import { Image, Newspaper, CalendarDays, Banknote } from "lucide-react";
const cards = [
  ["Images & Videos","Upload, replace, reorder, publish or delete website media.","/admin/media",Image],
  ["News","Add and manage school news under Notifications.","/admin/news",Newspaper],
  ["Events","Add and manage upcoming school events.","/admin/events",CalendarDays],
  ["Fee Structure","Create fee structures, fee items and upload the official PDF.","/admin/fees",Banknote],
] as const;
export default function AdminPage(){return <div><h1 className="text-3xl font-black text-[var(--mnb-navy)]">Admin Dashboard</h1><p className="mt-2 text-gray-600">Manage changing website content without changing the public design.</p><div className="mt-8 grid md:grid-cols-2 xl:grid-cols-4 gap-5">{cards.map(([t,d,h,I])=><Link key={h} href={h} className="rounded-2xl bg-white p-6 shadow-sm border hover:shadow-lg"><I className="text-[var(--mnb-blue)]" size={35}/><h2 className="mt-4 text-xl font-black text-[var(--mnb-navy)]">{t}</h2><p className="mt-2 text-gray-600">{d}</p></Link>)}</div></div>}
