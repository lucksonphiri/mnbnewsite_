import {Mail,MapPin,Phone} from "lucide-react";
export default function TopBar(){return <div className="bg-[var(--mnb-navy)] text-white text-sm"><div className="mx-auto max-w-7xl px-4 py-2 flex flex-col gap-2 md:flex-row md:items-center md:justify-between"><div className="flex flex-wrap gap-4"><span className="flex items-center gap-2"><MapPin size={15}/> Plot number 6 Corleinor Farm, Chegutu, Zimbabwe</span><span className="flex items-center gap-2"><Mail size={15}/> enquiries@mnb.ac.zw</span><span className="flex items-center gap-2"><Phone size={15}/>+263 78 728 2897</span></div><div className="flex gap-3">
    <a href="https://www.facebook.com/mnbcollege" target="_blank"><span>Facebook</span></a>
    <a href="https://www.tiktok.com/@user4566736815775" target="_blank"><span>TikTok</span></a>
    <a href="https://www.youtube.com" target="_blank"><span>YouTube</span></a>
    <a href="https://wa.me/+263787282897" target="_blank"><span>WhatsApp</span></a>
    </div>
    </div>
    </div>
    
}