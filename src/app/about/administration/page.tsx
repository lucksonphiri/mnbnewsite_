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
      Administration
    </h1>

    <p className="mt-6 max-w-3xl text-xl text-gray-100 leading-relaxed">
      Reach MNB College for admissions, enrolment enquiries,
      appointments, academic information and general support.
    </p>
  </div>
</section>

<section className="py-16"><div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-10"><div className="lg:col-span-2">
  
  <h2 className="section-title text-3xl">Administration</h2>
  <p className="mt-4 text-gray-600 text-lg leading-8">The administration of MNB College is responsible for the day-to-day management of the institution. It is led by the Founders, Directors, Chief Director, Head of School, and various departmental heads. The administration ensures effective teaching and learning, student welfare, financial management, staff development, and the smooth running of all school activities.</p><br></br>
  
  <h2 className="section-title text-3xl">Founders</h2>
  <p className="mt-4 text-gray-600 text-lg leading-8">
Mr. Brilliant Mbizi – Co-Founder and Director<br></br>
Mr. Norrest Manonge – Co-Founder and Director<br></br>

Head of School:
Mr. Chiparamazani
</p>
  
  
  <div className="mt-8 grid md:grid-cols-2 gap-5"><div className="p-6 rounded-2xl bg-[var(--mnb-light)]"><h3 className="font-black text-[var(--mnb-navy)]">Key Information</h3><p className="text-gray-600 mt-2">This page is ready for official MNB College content, images and downloadable documents.</p></div><div className="p-6 rounded-2xl bg-[var(--mnb-light)]"><h3 className="font-black text-[var(--mnb-navy)]">Need Help?</h3><p className="text-gray-600 mt-2">Contact admissions or administration for further guidance.</p></div></div></div><aside className="bg-[var(--mnb-light)] rounded-3xl p-7 h-fit"><h3 className="font-black text-xl text-[var(--mnb-navy)]">Quick Links</h3><div className="grid gap-3 mt-5"><Link href="/admissions/apply-online" className="bg-white p-4 rounded-xl">Apply Online</Link><Link href="/downloads/prospectus" className="bg-white p-4 rounded-xl">Prospectus</Link><Link href="/contact" className="bg-white p-4 rounded-xl">Contact Us</Link></div></aside></div></section></main>}