import Image from "next/image";
import { CalendarDays, Newspaper, Sparkles } from "lucide-react";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

type NewsPost = {
  id: number;
  title: string;
  slug: string;
  summary: string | null;
  content: string | null;
  image_url: string | null;
  created_at: string;
};

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-ZW", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function shortenText(text: string | null, maxLength = 170) {
  if (!text) return "Read the latest update from MNB College.";

  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength).trim()}...`;
}

export default async function NewsPage() {
  let news: NewsPost[] = [];

  try {
    news = (await sql`
      SELECT
        id,
        title,
        slug,
        summary,
        content,
        image_url,
        created_at
      FROM news_posts
      WHERE status = 'published'
      ORDER BY created_at DESC
    `) as NewsPost[];
  } catch (error) {
    console.error("Failed to load news:", error);
  }

  const featuredNews = news[0];
  const remainingNews = news.slice(1);

  return (
    <main>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[var(--mnb-navy)] py-24 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--mnb-navy)] via-[#0b4381] to-[#061d3c]" />

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--mnb-gold)]/10 blur-3xl" />

        <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2">
              <Newspaper size={18} className="text-[var(--mnb-gold)]" />

              <p className="text-sm font-bold uppercase tracking-[.2em] text-[var(--mnb-gold)]">
                Notifications
              </p>
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
              Latest News
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Stay informed about school announcements, achievements, academic
              activities, events and important updates from MNB College.
            </p>
          </div>
        </div>
      </section>

      {/* NEWS CONTENT */}
      <section className="bg-[var(--mnb-light)] py-16">
        <div className="mx-auto max-w-7xl px-4">
          {news.length > 0 ? (
            <>
              {/* FEATURED NEWS */}
              {featuredNews && (
                <article className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="grid lg:grid-cols-2">
                    <div className="relative min-h-[320px] overflow-hidden bg-slate-200 lg:min-h-[460px]">
                      {featuredNews.image_url ? (
                        <Image
                          src={featuredNews.image_url}
                          alt={featuredNews.title}
                          fill
                          priority
                          className="object-cover transition duration-700 group-hover:scale-105"
                          unoptimized={String(
                            featuredNews.image_url
                          ).startsWith("http")}
                        />
                      ) : (
                        <div className="flex h-full min-h-[320px] items-center justify-center bg-gradient-to-br from-[var(--mnb-navy)] to-[var(--mnb-blue)] text-white">
                          <Newspaper size={80} className="opacity-40" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:hidden" />

                      <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[var(--mnb-gold)] px-4 py-2 text-sm font-black text-[var(--mnb-navy)] shadow-lg">
                        <Sparkles size={16} />
                        Latest Update
                      </div>
                    </div>

                    <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
                      <div className="inline-flex items-center gap-2 text-sm font-bold text-[var(--mnb-blue)]">
                        <CalendarDays size={17} />
                        {formatDate(featuredNews.created_at)}
                      </div>

                      <h2 className="mt-5 text-3xl font-black leading-tight text-[var(--mnb-navy)] md:text-4xl">
                        {featuredNews.title}
                      </h2>

                      <div className="mt-5 h-1 w-20 rounded-full bg-[var(--mnb-gold)]" />

                      <p className="mt-6 text-lg leading-8 text-gray-600">
                        {shortenText(
                          featuredNews.summary || featuredNews.content,
                          320
                        )}
                      </p>

                      <div className="mt-8">
                        <span className="inline-flex rounded-full bg-[var(--mnb-light)] px-4 py-2 text-sm font-bold text-[var(--mnb-navy)]">
                          MNB College News
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* MORE NEWS */}
              {remainingNews.length > 0 && (
                <div className="mt-16">
                  <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="font-bold uppercase tracking-[.2em] text-[var(--mnb-gold)]">
                        More Updates
                      </p>

                      <h2 className="mt-2 text-3xl font-black text-[var(--mnb-navy)] md:text-4xl">
                        Recent News
                      </h2>
                    </div>

                    <p className="max-w-xl text-gray-600">
                      Browse additional announcements, activities and
                      achievements from across the school.
                    </p>
                  </div>

                  <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                    {remainingNews.map((item) => (
                      <article
                        key={item.id}
                        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                      >
                        <div className="relative h-60 overflow-hidden bg-slate-200">
                          {item.image_url ? (
                            <Image
                              src={item.image_url}
                              alt={item.title}
                              fill
                              className="object-cover transition duration-700 group-hover:scale-110"
                              unoptimized={String(item.image_url).startsWith(
                                "http"
                              )}
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--mnb-navy)] to-[var(--mnb-blue)] text-white">
                              <Newspaper size={64} className="opacity-40" />
                            </div>
                          )}

                          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <div className="inline-flex items-center gap-2 text-sm font-bold text-[var(--mnb-blue)]">
                            <CalendarDays size={16} />
                            {formatDate(item.created_at)}
                          </div>

                          <h3 className="mt-4 text-2xl font-black leading-snug text-[var(--mnb-navy)] transition group-hover:text-[var(--mnb-blue)]">
                            {item.title}
                          </h3>

                          <p className="mt-4 flex-1 leading-7 text-gray-600">
                            {shortenText(item.summary || item.content)}
                          </p>

                          <div className="mt-6 flex items-center justify-between border-t pt-5">
                            <span className="rounded-full bg-[var(--mnb-light)] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[var(--mnb-navy)]">
                              News
                            </span>

                            <span className="font-bold text-[var(--mnb-blue)]">
                              MNB College
                            </span>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-gray-300 bg-white px-6 py-20 text-center shadow-sm">
              <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[var(--mnb-light)] text-[var(--mnb-blue)]">
                <Newspaper size={38} />
              </div>

              <h2 className="mt-6 text-2xl font-black text-[var(--mnb-navy)]">
                No News Available Yet
              </h2>

              <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-500">
                There are currently no published news articles. Please check
                again later for school announcements and important updates.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}