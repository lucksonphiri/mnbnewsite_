import Image from "next/image";
import Link from "next/link";
import {
  Bed,
  BookOpen,
  Building2,
  ShieldCheck,
  Users,
  Utensils,
} from "lucide-react";

const hostelImages = [
  {
    src: "/hostels/block.jpeg",
    title: "Hostel Block",
    text: "Safe and supervised boarding facilities.",
  },
  {
    src: "/hostels/bed1.jpeg",
    title: "Boarding Beds",
    text: "Clean and organised sleeping arrangements.",
  },
  {
    src: "/hostels/bed2.jpeg",
    title: "Dormitory Rooms",
    text: "A structured environment for boarders.",
  },
  {
    src: "/hostels/study-room.jpg",
    title: "Study Environment",
    text: "Quiet spaces that support academic focus.",
  },
  
];

export default function Page() {
  return (
    <main>
      <section
        className="relative text-white py-32 bg-cover bg-center"
        style={{
          backgroundImage: "url('hostels/bed1.jpeg')",
        }}
      >
        <div className="absolute inset-0 bg-[var(--mnb-navy)]/75" />

        <div className="relative mx-auto max-w-7xl px-4">
          <p className="text-[var(--mnb-gold)] uppercase tracking-[.2em] font-bold">
            MNB College
          </p>

          <h1 className="text-4xl md:text-6xl font-black mt-3">
            Student Life
          </h1>

          <p className="mt-6 max-w-3xl text-xl text-gray-100 leading-relaxed">
            A balanced Christian learning environment that supports academics,
            discipline, leadership, boarding life, clubs, sports and personal
            growth.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <p className="text-[var(--mnb-gold)] uppercase tracking-[.2em] font-bold">
              Student Experience
            </p>

            <h2 className="section-title text-3xl mt-2">Student Life</h2>

            <p className="mt-4 text-gray-600 text-lg leading-8">
              At MNB College, student life extends beyond the classroom. We
              provide a balanced environment that promotes academic excellence,
              leadership, personal growth, Christian values and social
              development. Students are encouraged to participate in various
              activities that help them discover their talents, build lifelong
              skills and grow into disciplined, responsible young people.
            </p>

            <div className="mt-8 grid md:grid-cols-2 gap-5">
              <div className="p-6 rounded-2xl bg-[var(--mnb-light)]">
                <Users className="text-[var(--mnb-blue)]" />
                <h3 className="font-black text-[var(--mnb-navy)] mt-4">
                  Leadership & Fellowship
                </h3>
                <p className="text-gray-600 mt-2">
                  Students develop confidence through assemblies, worship,
                  clubs, mentorship and leadership responsibilities.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[var(--mnb-light)]">
                <BookOpen className="text-[var(--mnb-blue)]" />
                <h3 className="font-black text-[var(--mnb-navy)] mt-4">
                  Academic Support
                </h3>
                <p className="text-gray-600 mt-2">
                  Learners are supported through study routines, academic
                  guidance, library use, supervision and structured learning
                  time.
                </p>
              </div>
            </div>
          </div>

          <aside className="bg-[var(--mnb-light)] rounded-3xl p-7 h-fit">
            <h3 className="font-black text-xl text-[var(--mnb-navy)]">
              Quick Links
            </h3>

            <div className="grid gap-3 mt-5">
              <Link
                href="/admissions/apply-online"
                className="bg-white p-4 rounded-xl"
              >
                Apply Online
              </Link>

              <Link
                href="/downloads/prospectus"
                className="bg-white p-4 rounded-xl"
              >
                Prospectus
              </Link>

              <Link href="/contact" className="bg-white p-4 rounded-xl">
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-20 bg-[var(--mnb-light)]">
        <div className="mx-auto max-w-7xl px-4">
          <div className="max-w-3xl mb-10">
            <p className="text-[var(--mnb-gold)] uppercase tracking-[.2em] font-bold">
              Boarding Life
            </p>

            <h2 className="section-title text-3xl md:text-4xl mt-2">
              Hostels and Boarding Facilities
            </h2>

            <p className="mt-4 text-gray-600 text-lg leading-8">
              MNB College provides a safe, supervised and disciplined boarding
              environment where learners can focus on their studies, develop
              independence and grow within a caring Christian community.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-5">
            {hostelImages.map((item) => (
              <div
                key={item.src}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm card-hover"
              >
                <div className="relative h-64">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="p-5">
                  <h3 className="font-black text-lg text-[var(--mnb-navy)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 grid md:grid-cols-4 gap-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <Bed className="text-[var(--mnb-blue)]" />
              <h3 className="font-black text-[var(--mnb-navy)] mt-4">
                Comfortable Beds
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Organised sleeping arrangements that support rest and discipline.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <ShieldCheck className="text-[var(--mnb-blue)]" />
              <h3 className="font-black text-[var(--mnb-navy)] mt-4">
                Safety & Supervision
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Learners are supervised in a safe and structured boarding
                environment.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <Utensils className="text-[var(--mnb-blue)]" />
              <h3 className="font-black text-[var(--mnb-navy)] mt-4">
                Meals & Care
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Boarding life includes care, routine, meals and welfare support.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <Building2 className="text-[var(--mnb-blue)]" />
              <h3 className="font-black text-[var(--mnb-navy)] mt-4">
                Boarding Community
              </h3>
              <p className="text-gray-600 mt-2 text-sm">
                Students learn responsibility, respect and cooperation through
                communal living.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}