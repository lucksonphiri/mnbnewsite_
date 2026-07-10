import Link from "next/link";
export default function Page()

{return <main>
    
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
      Academics
    </h1>

    <p className="mt-6 max-w-3xl text-xl text-gray-100 leading-relaxed">
      Our Academics
    </p>
  </div>
</section>

<section className="py-16"><div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-10"><div className="lg:col-span-2"><h2 className="section-title text-3xl">Academic Support</h2><p className="mt-4 text-gray-600 text-lg leading-8">MNB College provides additional academic support through supervised study sessions, remedial lessons, and individual consultations with teachers. Students who require extra assistance receive targeted support to help them reach their full academic potential.
</p><br></br>

<h2 className="section-title text-3xl">Student Welfare and Safety</h2><p className="mt-4 text-gray-600 text-lg leading-8">The safety and well-being of our students remain our highest priority. Boarding facilities are monitored by experienced staff, and clear procedures are in place to ensure a secure and supportive environment at all times.

At MNB College, we believe that a well-balanced boarding experience develops confident, disciplined, and successful young men and women prepared for future leadership and excellence.

MNB College Motto: Your Passion, Your Profession
</p><br></br>

<h2 className="section-title text-3xl">Highlights</h2><p className="mt-4 text-gray-600 text-lg leading-8">MNB College provides a comprehensive academic programme designed to prepare learners for success in higher education, professional careers, and life. Our curriculum combines academic excellence, discipline, technology, and practical skills development.

Qualified and experienced teachers

Small class sizes (maximum 30 students per class)

Continuous assessment and progress monitoring

Computer-based learning

Career guidance and mentorship

Boarding and day school options

Online Parent Portal for academic tracking
</p>



<div className="mt-8 grid md:grid-cols-2 gap-5"><div className="p-6 rounded-2xl bg-[var(--mnb-light)]"><h3 className="font-black text-[var(--mnb-navy)]">Key Information</h3><p className="text-gray-600 mt-2">This page is ready for official MNB College content, images and downloadable documents.</p></div><div className="p-6 rounded-2xl bg-[var(--mnb-light)]"><h3 className="font-black text-[var(--mnb-navy)]">Need Help?</h3><p className="text-gray-600 mt-2">Contact admissions or administration for further guidance.</p></div></div></div><aside className="bg-[var(--mnb-light)] rounded-3xl p-7 h-fit"><h3 className="font-black text-xl text-[var(--mnb-navy)]">Quick Links</h3><div className="grid gap-3 mt-5"><Link href="/admissions/apply-online" className="bg-white p-4 rounded-xl">Apply Online</Link><Link href="/downloads/prospectus" className="bg-white p-4 rounded-xl">Prospectus</Link><Link href="/contact" className="bg-white p-4 rounded-xl">Contact Us</Link></div></aside></div></section></main>

}