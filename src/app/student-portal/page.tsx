import Link from "next/link";
export default function Page(){return <main>
    
 <section
  className="relative text-white py-32 bg-cover bg-center"
  style={{
    backgroundImage: "url('IMG_20230630_151418.jpg')",
  }}
>
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-[var(--mnb-navy)]/70"></div>

  {/* Existing Content */}
  <div className="relative mx-auto max-w-7xl px-4">
    <p className="text-[var(--mnb-gold)] uppercase tracking-[.2em] font-bold">
      MNB COLLEGE
    </p>

    <h1 className="text-4xl md:text-6xl font-black mt-3">
      Student Portal
    </h1>

    <p className="mt-6 max-w-3xl text-xl text-gray-100 leading-relaxed">
      Student Portal
    </p>
  </div>
</section>


<section className="py-16"><div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-10"><div className="lg:col-span-2"><h2 className="section-title text-3xl">Student Portal</h2>

<a href="https://erp.mnb.ac.zw/parent/login" target="_blank"><p className="mt-4 text-gray-600 text-lg leading-8">Click The Link Below To Go To Portal.</p></a><br></br>
    
    <Link href="https://erp.mnb.ac.zw/parent/login/" target= "_blank" className="bg-white p-4 rounded-xl">Student Portal Link</Link>


<div className="mt-8 grid md:grid-cols-2 gap-5"><div className="p-6 rounded-2xl bg-[var(--mnb-light)]"><h3 className="font-black text-[var(--mnb-navy)]">Key Information</h3><p className="text-gray-600 mt-2">This page is ready for official MNB College content, images and downloadable documents.</p></div><div className="p-6 rounded-2xl bg-[var(--mnb-light)]"><h3 className="font-black text-[var(--mnb-navy)]">Need Help?</h3><p className="text-gray-600 mt-2">Contact admissions or administration for further guidance.</p></div></div></div><aside className="bg-[var(--mnb-light)] rounded-3xl p-7 h-fit"><h3 className="font-black text-xl text-[var(--mnb-navy)]">Quick Links</h3><div className="grid gap-3 mt-5"><Link href="/admissions/apply-online" className="bg-white p-4 rounded-xl">Apply Online</Link><Link href="/downloads/prospectus" className="bg-white p-4 rounded-xl">Prospectus</Link><Link href="/contact" className="bg-white p-4 rounded-xl">Contact Us</Link></div></aside></div></section></main>}