
"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SectionHeader from "@/components/SectionHeader";
import {
  BookOpen,
  Building2,
  CalendarDays,
  Download,
  FlaskConical,
  Laptop,
  Quote,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";

const cards = [
  [
    "High School",
    "Strong academic foundation with discipline, science, technology and examination preparation.",
    BookOpen,
    "/academics/high-school",
  ],
  [
    "Cambridge & ZIMSEC",
    "Academic pathways designed for local and international progression.",
    Trophy,
    "/academics",
  ],
  [
    "ICT & Innovation",
    "Robotics, programming, AI clubs and practical digital skills.",
    Laptop,
    "/departments/robotics-programming",
  ],
  [
    "Boarding Facilities",
    "Safe, supervised and supportive environment.",
    Building2,
    "/student-life/accommodation",
  ],
];

const defaultHeroSlides = [
  {
    image: "/image1.png",
    eyebrow: "Your Passion, Your Profession",
    title: "Raising Disciplined, God-Fearing and Academically Excellent Learners",
    text: "MNB College is a premium Christian-based day and boarding school offering ZIMSEC and Cambridge-aligned learning pathways supported by strong discipline, academic excellence, modern facilities, technology integration and Christian values.",
  },
  {
    image: "/image2.png",
    eyebrow: "Christian-Based Day & Boarding School",
    title: "A Caring Learning Environment Built on Faith and Discipline",
    text: "We believe education is strongest when grounded in biblical truth, prayer, pastoral care and servant leadership.",
  },
  {
    image: "/image3.png",
    eyebrow: "Student Life",
    title: "Learners Growing in Character, Confidence and Leadership",
    text: "MNB College promotes balanced development through academics, assemblies, mentorship, clubs, sports and guided learner support.",
  },
  {
    image: "/IMG_20230630_151418.jpg",
    eyebrow: "Modern Facilities",
    title: "Practical Science Learning for Future Innovators",
    text: "Our science laboratories support hands-on learning, curiosity, experimentation and strong STEM foundations.",
  },
  {
    image: "/IMG_20230630_171411.jpg",
    eyebrow: "STEM Excellence",
    title: "Equipped for ZIMSEC, Cambridge and Practical Future Skills",
    text: "Learners are prepared through academic pathways that combine theory, practical work, technology and innovation.",
  },
];

export default function Home() {
  const [heroSlides, setHeroSlides] = useState(defaultHeroSlides);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch("/api/media?section=home")
      .then((response) => response.ok ? response.json() : [])
      .then((rows) => {
        if (Array.isArray(rows) && rows.length > 0) {
          setHeroSlides(rows.map((row: any) => ({
            image: row.file_url,
            eyebrow: row.title || "MNB College",
            title: row.title || "MNB College",
            text: row.description || "Learning, discipline and excellence."
          })));
        }
      })
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((previous) => (previous + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const activeSlide = heroSlides[currentSlide];

  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden text-white">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}

        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,47,99,0.92)] via-[rgba(6,47,99,0.74)] to-[rgba(6,47,99,0.35)]" />
        <div className="absolute inset-0 bg-black/20" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 min-h-[720px] flex items-center">
          <div className="max-w-3xl">
            <Image
              src="/logo.png"
              alt="MNB College Logo"
              width={130}
              height={130}
              className="mb-6 rounded-2xl bg-white p-2 shadow-lg"
              priority
            />

            <p className="uppercase tracking-[.28em] text-[var(--mnb-gold)] font-bold mb-4">
              {activeSlide.eyebrow}
            </p>

            <h1 className="text-4xl md:text-6xl font-black leading-tight drop-shadow-lg">
              {activeSlide.title}
            </h1>

            <p className="mt-6 text-lg text-blue-50 max-w-2xl leading-8">
              {activeSlide.text}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/admissions/apply-online"
                className="bg-[var(--mnb-gold)] text-[var(--mnb-navy)] px-7 py-4 rounded-full font-bold"
              >
                Apply Online
              </Link>

              <Link
                href="/downloads/prospectus"
                className="border border-white px-7 py-4 rounded-full font-bold"
              >
                Download Prospectus
              </Link>

              <Link
                href="/contact"
                className="bg-white text-[var(--mnb-navy)] px-7 py-4 rounded-full font-bold"
              >
                Book a School Tour
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.image}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "w-10 bg-[var(--mnb-gold)]"
                  : "w-3 bg-white/70 hover:bg-white"
              }`}
              aria-label={`Go to hero slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="py-14 bg-[var(--mnb-light)]">
        <div className="mx-auto max-w-7xl px-4 grid md:grid-cols-3 gap-6">
          <Link
            href="/admissions/apply-online"
            className="bg-[var(--mnb-blue)] text-white rounded-2xl p-7 card-hover"
          >
            <h3 className="text-2xl font-black">Apply for Admission</h3>
            <p className="mt-2 text-blue-50">Start your application online.</p>
          </Link>

          <Link
            href="/downloads/prospectus"
            className="bg-white rounded-2xl p-7 card-hover border"
          >
            <Download className="text-[var(--mnb-blue)]" />
            <h3 className="text-2xl font-black mt-3 text-[var(--mnb-navy)]">
              Download Prospectus
            </h3>
            <p className="mt-2 text-gray-600">
              View programmes, requirements and facilities.
            </p>
          </Link>

          <Link
            href="/contact"
            className="bg-[var(--mnb-gold)] text-[var(--mnb-navy)] rounded-2xl p-7 card-hover"
          >
            <h3 className="text-2xl font-black">Book a Visit</h3>
            <p className="mt-2">Talk to admissions and tour the school.</p>
          </Link>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            eyebrow="Why Choose Us"
            title="A learner-centred school with practical future skills"
            text="MNB College combines academic discipline with innovation, technology and strong student support."
          />

          <div className="grid md:grid-cols-4 gap-6">
            {cards.map(([title, text, Icon, href]) => {
              const C = Icon as typeof BookOpen;

              return (
                <Link
                  key={title as string}
                  href={href as string}
                  className="p-7 border rounded-3xl card-hover bg-white"
                >
                  <C className="text-[var(--mnb-blue)]" size={38} />
                  <h3 className="font-black text-xl mt-5 text-[var(--mnb-navy)]">
                    {title as string}
                  </h3>
                  <p className="text-gray-600 mt-3">{text as string}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--mnb-navy)] text-white">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-[var(--mnb-gold)] font-bold uppercase tracking-[.2em]">
              Word of Today
            </p>
            <h2 className="text-4xl font-black mt-3">Discipline</h2>
            <p className="text-blue-100 mt-5 text-lg">
              Discipline is the bridge between goals and achievement. Every
              learner is encouraged to develop self-control, responsibility and
              focus.
            </p>
          </div>

          <div className="bg-white text-[var(--mnb-navy)] rounded-3xl p-8">
            <Quote className="text-[var(--mnb-gold)]" />
            <p className="text-2xl font-bold mt-4">
              “Success is built daily through small acts of consistency, respect
              and commitment.”
            </p>
            <p className="mt-4 text-gray-600">
              Daily value reflection for assembly, classrooms and learners.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[var(--mnb-light)]">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            eyebrow="Our Facilities"
            title="Designed for learning, safety and innovation"
          />

          <div className="grid md:grid-cols-3 gap-6">
            {[
              ["Science Laboratories", "Practical learning spaces for science.", FlaskConical],
              ["Digital Learning", "E-learning support and computer labs.", Laptop],
              ["Student Support", "Guidance, counselling and mentorship.", Users],
              ["Sports & Clubs", "Sport, arts, clubs and competitions.", Trophy],
              ["Safe Campus", "Structured discipline and learner protection.", ShieldCheck],
              ["Academic Calendar", "Events and examination planning.", CalendarDays],
            ].map(([title, text, Icon]) => {
              const C = Icon as typeof Laptop;

              return (
                <div
                  key={title as string}
                  className="bg-white rounded-3xl p-7 card-hover"
                >
                  <C className="text-[var(--mnb-blue)]" />
                  <h3 className="text-xl font-black text-[var(--mnb-navy)] mt-4">
                    {title as string}
                  </h3>
                  <p className="text-gray-600 mt-2">{text as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
