import Link from "next/link";
import { Download } from "lucide-react";
import {
  Baby,
  BookOpen,
  FileCheck,
  FileText,
  HelpCircle,
  Layers,
  Phone,
} from "lucide-react";

const requirements = [
  {
    title: "Original Birth Certificate",
    text: "A valid original birth certificate is required for identity verification and official school records.",
    icon: Baby,
  },
  {
    title: "Grade 7 Results Slip",
    text: "Form 1 applicants must submit their Grade 7 results slip as proof of completion of primary education and for placement purposes.",
    icon: FileCheck,
  },
  {
    title: "One Ream of Bond Paper",
    text: "Each applicant is required to bring one ream of bond paper as part of the admission requirements.",
    icon: Layers,
  },
  {
    title: "Previous Report Book for Other Grades",
    text: "Applicants applying for any grade other than Form 1 must submit their previous school report book. This helps the school assess academic progress and determine the correct class placement.",
    icon: BookOpen,
  },
];

export default function Page() {
  return (
    <main>
      <section
        className="relative text-white py-32 bg-cover bg-center"
        style={{
          backgroundImage: "url('/IMG_20230630_151418.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-[var(--mnb-navy)]/75" />

        <div className="relative mx-auto max-w-7xl px-4">
          <p className="text-[var(--mnb-gold)] uppercase tracking-[.2em] font-bold">
            MNB College
          </p>

          <h1 className="text-4xl md:text-6xl font-black mt-3">
            Admission Requirements
          </h1>

          <p className="mt-6 max-w-3xl text-xl text-gray-100 leading-relaxed">
            Documents and conditions required when applying for enrolment at MNB
            College.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[var(--mnb-light)]">
        <div className="mx-auto max-w-7xl px-4 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <p className="text-[var(--mnb-gold)] uppercase tracking-[.2em] font-bold">
              Admissions
            </p>

            <h2 className="section-title text-3xl mt-2">
              Admission Requirements
            </h2>

            <p className="mt-4 text-gray-600 text-lg leading-8">
              Applicants who wish to enrol at MNB College are required to submit
              the necessary documents to support their application. These
              documents help the school verify the learner’s identity, academic
              background and appropriate level of placement.
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-6">
              {requirements.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="bg-white rounded-3xl p-7 shadow-sm border-l-4 border-[var(--mnb-gold)] card-hover"
                  >
                    <div className="flex items-start gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-[var(--mnb-navy)] text-white grid place-items-center flex-shrink-0">
                        <Icon size={28} />
                      </div>

                      <div>
                        <p className="text-sm font-black text-[var(--mnb-gold)]">
                          Requirement {index + 1}
                        </p>

                        <h3 className="font-black text-xl text-[var(--mnb-navy)] mt-1">
                          {item.title}
                        </h3>

                        <p className="text-gray-600 mt-3 leading-7">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm border-l-4 border-[var(--mnb-navy)]">
              <div className="flex items-start gap-4">
                <div className="h-14 w-14 rounded-2xl bg-[var(--mnb-gold)] text-[var(--mnb-navy)] grid place-items-center flex-shrink-0">
                  <HelpCircle size={30} />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-[var(--mnb-navy)]">
                    Important Note
                  </h3>

                  <p className="mt-4 text-gray-600 leading-8">
                    Parents and guardians are encouraged to ensure that all
                    required documents are available before visiting the school
                    for enrolment. Applications with missing documents may take
                    longer to process.
                  </p>

                  <p className="mt-4 text-gray-600 leading-8">
                    You may contact the admissions office for further guidance
                    on enrolment procedures, available places, fees and opening
                    dates.
                  </p>
                </div>

                
              </div>
<div className="mt-10 rounded-3xl bg-[var(--mnb-navy)] text-white p-8 shadow-xl">

    <h3 className="text-2xl font-black">
        Download the Official Admissions Requirements Document
    </h3>

    <p className="mt-3 text-blue-100">
        Click the button below to download the official MNB College
        Requirements Document.
    </p>

    <a
        href="/documents/MNB_College_Admission_Requirements.pdf"
        download
        className="mt-6 inline-flex items-center gap-3 rounded-xl bg-[var(--mnb-gold)] px-8 py-4 font-bold text-[var(--mnb-navy)] hover:scale-105 transition"
    >
        <Download size={22}/>
        Download PDF
    </a>

</div>
              
            </div>



            
          </div>

          <aside className="bg-white rounded-3xl p-7 h-fit shadow-sm">
            <h3 className="font-black text-xl text-[var(--mnb-navy)]">
              Quick Links
            </h3>

            <div className="grid gap-3 mt-5">
              <Link
                href="/admissions/apply-online"
                className="bg-[var(--mnb-light)] p-4 rounded-xl flex items-center justify-between"
              >
                Apply Online <span>→</span>
              </Link>

              <Link
                href="/admissions/fees"
                className="bg-[var(--mnb-light)] p-4 rounded-xl flex items-center justify-between"
              >
                Fees Structure <span>→</span>
              </Link>

              <Link
                href="/downloads/prospectus"
                className="bg-[var(--mnb-light)] p-4 rounded-xl flex items-center justify-between"
              >
                Prospectus <span>→</span>
              </Link>

              <Link
                href="/contact"
                className="bg-[var(--mnb-light)] p-4 rounded-xl flex items-center justify-between"
              >
                Contact Us <span>→</span>
              </Link>
            </div>

            <div className="mt-8 bg-[var(--mnb-navy)] text-white rounded-2xl p-6">
              <Phone className="text-[var(--mnb-gold)]" />

              <h4 className="font-black text-lg mt-4">Need Help?</h4>

              <p className="mt-2 text-blue-100 text-sm">
                Contact the admissions office for enrolment guidance.
              </p>

              <p className="mt-4 font-bold">+263 78 728 2897</p>
              <p className="text-sm">enquiries@mnb.ac.zw</p>
            </div>

            <div className="mt-6 rounded-2xl bg-[var(--mnb-gold)] text-[var(--mnb-navy)] p-6">
              <FileText />

              <h4 className="font-black text-lg mt-4">
                Prepare Before Visiting
              </h4>

              <p className="mt-2 text-sm">
                Bring all required documents to avoid delays during enrolment.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}