import Link from "next/link";

export default function Page() {
  return (
    <main>
      {/* Hero Section */}
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
      Contact Us
    </h1>

    <p className="mt-6 max-w-3xl text-xl text-gray-100 leading-relaxed">
      Reach MNB College for admissions, enrolment enquiries,
      appointments, academic information and general support.
    </p>
  </div>
</section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="section-title text-3xl">Get In Touch</h2>

            <p className="mt-4 text-gray-600 text-lg leading-8">
              We welcome prospective students, parents and visitors.
              Contact us using the details below or visit our campus.
            </p>

            <div className="mt-8 grid md:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl bg-[var(--mnb-light)]">
                <h3 className="font-black text-[var(--mnb-navy)] text-xl">
                  Address
                </h3>

                <p className="text-gray-600 mt-3">
                  Plot number 6, Corleinor Farm
                  <br />
                  Chegutu
                  <br />
                  Zimbabwe
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--mnb-light)]">
                <h3 className="font-black text-[var(--mnb-navy)] text-xl">
                  Contact Details
                </h3>

                <p className="text-gray-600 mt-3">
                  Phone: +263 78 728 2897
                  <br />
                  Email: enquiries@mnb.ac.zw
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="bg-[var(--mnb-light)] rounded-3xl p-7 h-fit">
            <h3 className="font-black text-xl text-[var(--mnb-navy)]">
              Quick Links
            </h3>

            <div className="grid gap-3 mt-5">
              <Link
                href="/admissions/apply-online"
                className="bg-white p-4 rounded-xl hover:shadow-md transition"
              >
                Apply Online
              </Link>

              <Link
                href="/downloads/prospectus"
                className="bg-white p-4 rounded-xl hover:shadow-md transition"
              >
                Prospectus
              </Link>

              <Link
                href="/contact"
                className="bg-white p-4 rounded-xl hover:shadow-md transition"
              >
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* FULL SCREEN MAP */}
      <section className="w-full">
        <div className="bg-[var(--mnb-navy)] text-white py-8 text-center">
          <h2 className="text-3xl font-black">Visit Our Campus</h2>

          <p className="mt-2 text-gray-200">
            Locate MNB College on Google Maps
          </p>
        </div>

        <iframe
  src="https://www.google.com/maps?q=MNB%20College%2C%20No.%201%20Warwick%20Road%2C%20Chegutu%2C%20Zimbabwe&output=embed"
  className="w-full h-screen"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

        <div className="text-center py-8">
          <a
            href="https://maps.app.goo.gl/q1CER4RGbFgcxfZ1A?g_st=awb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--mnb-navy)] text-white px-8 py-4 rounded-xl font-bold hover:opacity-90 transition"
          >
            Open in Google Maps
          </a>
        </div>
      </section>
    </main>
  );
}
