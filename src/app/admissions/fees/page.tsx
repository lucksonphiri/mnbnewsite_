import Link from "next/link";
import {
  BadgeDollarSign,
  BookOpenCheck,
  CheckCircle2,
  Download,
  FileText,
  GraduationCap,
  Info,
  Phone,
  ReceiptText,
  ShieldCheck,
} from "lucide-react";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

type FeeStructure = {
  id: number;
  title: string | null;
  description: string | null;
  year: number;
  pdf_url: string | null;
};

type FeeItem = {
  id: number;
  fee_structure_id: number;
  class_name: string;
  item_name: string;
  currency: string;
  amount: string | number;
  display_order: number;
};

function formatAmount(currency: string, amount: number) {
  return `${currency || "USD"} ${amount.toFixed(2)}`;
}

export default async function Page() {
  let structure: FeeStructure | null = null;
  let items: FeeItem[] = [];

  try {
    const rows = (await sql`
      SELECT
        id,
        title,
        description,
        year,
        pdf_url
      FROM fee_structures
      WHERE status = 'active'
      ORDER BY year DESC, id DESC
      LIMIT 1
    `) as FeeStructure[];

    structure = rows[0] || null;

    if (structure) {
      items = (await sql`
        SELECT
          id,
          fee_structure_id,
          class_name,
          item_name,
          currency,
          amount,
          display_order
        FROM fee_items
        WHERE fee_structure_id = ${structure.id}
        ORDER BY class_name, display_order, id
      `) as FeeItem[];
    }
  } catch (error) {
    console.error("Failed to load fees structure:", error);
  }

  const groupedItems = Object.entries(
    items.reduce<Record<string, FeeItem[]>>((groups, item) => {
      const groupName = item.class_name || "General Fees";

      if (!groups[groupName]) {
        groups[groupName] = [];
      }

      groups[groupName].push(item);
      return groups;
    }, {})
  );

  const year = structure?.year || new Date().getFullYear();

  const overallTotal = items.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  return (
    <main>
      {/* HERO SECTION */}
      <section
        className="relative overflow-hidden bg-cover bg-center py-28 text-white md:py-36"
        style={{
          backgroundImage: "url('/IMG_20230630_151418.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,47,99,0.96)] via-[rgba(6,47,99,0.82)] to-[rgba(6,47,99,0.55)]" />

        <div className="absolute -right-28 -top-28 h-96 w-96 rounded-full bg-[var(--mnb-gold)]/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
              <BadgeDollarSign
                size={18}
                className="text-[var(--mnb-gold)]"
              />

              <p className="text-sm font-bold uppercase tracking-[.2em] text-[var(--mnb-gold)]">
                MNB College
              </p>
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
              {structure?.title || `${year} Fees Structure`}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100 md:text-xl">
              {structure?.description ||
                `View the official ${year} fee catalogue for MNB College learners, parents and guardians.`}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {structure?.pdf_url && (
                <a
                  href={structure.pdf_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full bg-[var(--mnb-gold)] px-7 py-4 font-black text-[var(--mnb-navy)] shadow-lg transition hover:-translate-y-1"
                >
                  <Download size={20} />
                  Download Fees PDF
                </a>
              )}

              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full border border-white/40 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-sm transition hover:bg-white hover:text-[var(--mnb-navy)]"
              >
                <Phone size={20} />
                Contact Finance Office
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SUMMARY CARDS */}
      <section className="relative z-10 -mt-10 px-4">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          <div className="rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--mnb-light)] text-[var(--mnb-blue)]">
                <ReceiptText size={28} />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-gray-500">
                  Fee Categories
                </p>

                <p className="mt-1 text-3xl font-black text-[var(--mnb-navy)]">
                  {groupedItems.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[var(--mnb-light)] text-[var(--mnb-blue)]">
                <FileText size={28} />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-gray-500">
                  Fee Items
                </p>

                <p className="mt-1 text-3xl font-black text-[var(--mnb-navy)]">
                  {items.length}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl bg-[var(--mnb-navy)] p-6 text-white shadow-xl">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-[var(--mnb-gold)]">
                <ShieldCheck size={28} />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-wide text-blue-200">
                  Academic Year
                </p>

                <p className="mt-1 text-3xl font-black">{year}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEES CONTENT */}
      <section className="bg-[var(--mnb-light)] py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-8">
              <p className="font-bold uppercase tracking-[.2em] text-[var(--mnb-gold)]">
                Fees Catalogue
              </p>

              <h2 className="mt-2 text-3xl font-black text-[var(--mnb-navy)] md:text-4xl">
                {structure?.title || `${year} Fees Structure`}
              </h2>

              <p className="mt-4 max-w-3xl leading-7 text-gray-600">
                Review the fees applicable to each class or programme. Parents
                and guardians should confirm payment instructions with the
                Finance Office before making payments.
              </p>
            </div>

            {groupedItems.map(([groupName, rows], groupIndex) => {
              const groupTotal = rows.reduce(
                (sum, item) => sum + Number(item.amount || 0),
                0
              );

              const groupCurrency = rows[0]?.currency || "USD";

              return (
                <section
                  key={groupName}
                  className="mb-8 overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm transition duration-300 hover:shadow-xl"
                >
                  <div className="flex flex-col gap-5 bg-gradient-to-r from-[var(--mnb-navy)] to-[var(--mnb-blue)] px-6 py-6 text-white md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                      <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-[var(--mnb-gold)]">
                        <GraduationCap size={28} />
                      </div>

                      <div>
                        <p className="text-sm font-bold uppercase tracking-widest text-blue-200">
                          Fee Category {groupIndex + 1}
                        </p>

                        <h3 className="mt-1 text-2xl font-black">
                          {groupName}
                        </h3>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white/10 px-5 py-3 backdrop-blur-sm">
                      <p className="text-xs font-bold uppercase tracking-wide text-blue-200">
                        Category Total
                      </p>

                      <p className="mt-1 text-xl font-black text-[var(--mnb-gold)]">
                        {formatAmount(groupCurrency, groupTotal)}
                      </p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[620px] text-left">
                      <thead className="bg-[var(--mnb-gold)] text-[var(--mnb-navy)]">
                        <tr>
                          <th className="px-6 py-4">#</th>
                          <th className="px-6 py-4">Fee Item</th>
                          <th className="px-6 py-4 text-right">Amount</th>
                        </tr>
                      </thead>

                      <tbody>
                        {rows.map((item, index) => (
                          <tr
                            key={item.id}
                            className="border-b border-gray-100 transition hover:bg-[var(--mnb-light)]"
                          >
                            <td className="px-6 py-5 text-gray-400">
                              {String(index + 1).padStart(2, "0")}
                            </td>

                            <td className="px-6 py-5 font-semibold text-gray-700">
                              <div className="flex items-center gap-3">
                                <CheckCircle2
                                  size={18}
                                  className="shrink-0 text-green-600"
                                />

                                {item.item_name}
                              </div>
                            </td>

                            <td className="px-6 py-5 text-right text-lg font-black text-[var(--mnb-navy)]">
                              {formatAmount(
                                item.currency,
                                Number(item.amount || 0)
                              )}
                            </td>
                          </tr>
                        ))}

                        <tr className="bg-[var(--mnb-navy)] text-white">
                          <td
                            colSpan={2}
                            className="px-6 py-5 text-lg font-black"
                          >
                            Total for {groupName}
                          </td>

                          <td className="px-6 py-5 text-right text-xl font-black text-[var(--mnb-gold)]">
                            {formatAmount(groupCurrency, groupTotal)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              );
            })}

            {groupedItems.length === 0 && (
              <div className="rounded-[2rem] border border-dashed border-gray-300 bg-white px-6 py-16 text-center shadow-sm">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[var(--mnb-light)] text-[var(--mnb-blue)]">
                  <ReceiptText size={38} />
                </div>

                <h3 className="mt-6 text-2xl font-black text-[var(--mnb-navy)]">
                  Fees Not Available Yet
                </h3>

                <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-500">
                  The active fee structure does not have fee items yet. Please
                  contact the Finance Office for the latest payment information.
                </p>
              </div>
            )}

            {items.length > 0 && (
              <div className="mt-10 rounded-[2rem] bg-white p-7 shadow-sm">
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[.2em] text-[var(--mnb-gold)]">
                      Catalogue Summary
                    </p>

                    <h3 className="mt-2 text-2xl font-black text-[var(--mnb-navy)]">
                      Total of All Listed Fee Items
                    </h3>

                    <p className="mt-2 text-gray-600">
                      This figure combines all items currently listed across the
                      active fee categories.
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[var(--mnb-light)] px-7 py-5 text-right">
                    <p className="text-sm font-bold uppercase tracking-wide text-gray-500">
                      Overall Listed Total
                    </p>

                    <p className="mt-2 text-3xl font-black text-[var(--mnb-navy)]">
                      {formatAmount(
                        items[0]?.currency || "USD",
                        overallTotal
                      )}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {structure?.pdf_url && (
              <div className="mt-10 overflow-hidden rounded-[2rem] bg-gradient-to-r from-[var(--mnb-navy)] to-[var(--mnb-blue)] p-8 text-white shadow-xl md:p-10">
                <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start gap-5">
                    <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-white/10 text-[var(--mnb-gold)]">
                      <Download size={30} />
                    </div>

                    <div>
                      <h3 className="text-2xl font-black md:text-3xl">
                        Download the Official Fees Catalogue
                      </h3>

                      <p className="mt-3 max-w-2xl leading-7 text-blue-100">
                        Download and keep the official fee structure in PDF
                        format for reference, printing or sharing.
                      </p>
                    </div>
                  </div>

                  <a
                    href={structure.pdf_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center justify-center gap-3 rounded-xl bg-[var(--mnb-gold)] px-7 py-4 font-black text-[var(--mnb-navy)] transition hover:-translate-y-1"
                  >
                    <Download size={21} />
                    Download PDF
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-6">
            <div className="rounded-[2rem] bg-white p-7 shadow-sm">
              <div className="flex items-center gap-3">
                <BookOpenCheck className="text-[var(--mnb-blue)]" />

                <h3 className="text-xl font-black text-[var(--mnb-navy)]">
                  Quick Links
                </h3>
              </div>

              <div className="mt-6 grid gap-4">
                <Link
                  href="/admissions/apply-online"
                  className="group flex items-center justify-between rounded-2xl bg-[var(--mnb-light)] p-5 font-bold text-[var(--mnb-navy)] transition hover:bg-[var(--mnb-navy)] hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <GraduationCap size={21} />
                    Apply Online
                  </span>

                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  href="/downloads/prospectus"
                  className="group flex items-center justify-between rounded-2xl bg-[var(--mnb-light)] p-5 font-bold text-[var(--mnb-navy)] transition hover:bg-[var(--mnb-navy)] hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <FileText size={21} />
                    Prospectus
                  </span>

                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>

                <Link
                  href="/contact"
                  className="group flex items-center justify-between rounded-2xl bg-[var(--mnb-light)] p-5 font-bold text-[var(--mnb-navy)] transition hover:bg-[var(--mnb-navy)] hover:text-white"
                >
                  <span className="flex items-center gap-3">
                    <Phone size={21} />
                    Contact Us
                  </span>

                  <span className="transition group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] bg-[var(--mnb-navy)] p-7 text-white shadow-sm">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-[var(--mnb-gold)]">
                <Phone size={27} />
              </div>

              <h3 className="mt-5 text-2xl font-black">
                Need Help With Fees?
              </h3>

              <p className="mt-3 leading-7 text-blue-100">
                Contact the Admissions and Finance Office for payment methods,
                deadlines and current account details.
              </p>

              <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
                <a
                  href="tel:+263787282897"
                  className="block font-black text-[var(--mnb-gold)]"
                >
                  +263 78 728 2897
                </a>

                <a
                  href="mailto:enquiries@mnb.ac.zw"
                  className="block text-sm text-blue-100"
                >
                  enquiries@mnb.ac.zw
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[var(--mnb-gold)]/40 bg-[var(--mnb-cream)] p-7">
              <div className="flex items-center gap-3">
                <Info className="text-[var(--mnb-navy)]" />

                <h3 className="text-xl font-black text-[var(--mnb-navy)]">
                  Important Note
                </h3>
              </div>

              <p className="mt-4 leading-7 text-gray-700">
                Fees may be reviewed when necessary. Parents and guardians
                should always confirm the latest official figures before making
                payment.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}