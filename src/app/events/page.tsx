import Image from "next/image";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Sparkles,
  TicketCheck,
} from "lucide-react";
import { sql } from "@/lib/db";

export const dynamic = "force-dynamic";

type SchoolEvent = {
  id: number;
  title: string;
  description: string | null;
  event_date: string;
  venue: string | null;
  image_url: string | null;
};

function formatEventDate(date: string) {
  return new Intl.DateTimeFormat("en-ZW", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function getDay(date: string) {
  return new Intl.DateTimeFormat("en-ZW", {
    day: "2-digit",
  }).format(new Date(date));
}

function getMonth(date: string) {
  return new Intl.DateTimeFormat("en-ZW", {
    month: "short",
  })
    .format(new Date(date))
    .toUpperCase();
}

function shortenText(text: string | null, maxLength = 170) {
  if (!text) {
    return "View details about this upcoming MNB College event.";
  }

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trim()}...`;
}

export default async function EventsPage() {
  let events: SchoolEvent[] = [];

  try {
    events = (await sql`
      SELECT
        id,
        title,
        description,
        event_date,
        venue,
        image_url
      FROM events
      WHERE status = 'published'
      ORDER BY event_date ASC
    `) as SchoolEvent[];
  } catch (error) {
    console.error("Failed to load events:", error);
  }

  const featuredEvent = events[0];
  const remainingEvents = events.slice(1);

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
              <CalendarDays
                size={18}
                className="text-[var(--mnb-gold)]"
              />

              <p className="text-sm font-bold uppercase tracking-[.2em] text-[var(--mnb-gold)]">
                Notifications
              </p>
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight md:text-6xl">
              Upcoming Events
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-blue-100">
              Keep up with important school dates, academic activities,
              assemblies, sporting events and special programmes at MNB College.
            </p>
          </div>
        </div>
      </section>

      {/* EVENTS CONTENT */}
      <section className="bg-[var(--mnb-light)] py-16">
        <div className="mx-auto max-w-7xl px-4">
          {events.length > 0 ? (
            <>
              {/* FEATURED EVENT */}
              {featuredEvent && (
                <article className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="grid lg:grid-cols-2">
                    <div className="relative min-h-[320px] overflow-hidden bg-slate-200 lg:min-h-[460px]">
                      {featuredEvent.image_url ? (
                        <Image
                          src={featuredEvent.image_url}
                          alt={featuredEvent.title}
                          fill
                          priority
                          className="object-cover transition duration-700 group-hover:scale-105"
                          unoptimized={String(
                            featuredEvent.image_url
                          ).startsWith("http")}
                        />
                      ) : (
                        <div className="flex h-full min-h-[320px] items-center justify-center bg-gradient-to-br from-[var(--mnb-navy)] to-[var(--mnb-blue)] text-white">
                          <CalendarDays size={84} className="opacity-40" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />

                      <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-[var(--mnb-gold)] px-4 py-2 text-sm font-black text-[var(--mnb-navy)] shadow-lg">
                        <Sparkles size={16} />
                        Next Event
                      </div>

                      <div className="absolute bottom-5 left-5 rounded-2xl bg-white px-5 py-4 text-center shadow-xl">
                        <p className="text-3xl font-black text-[var(--mnb-navy)]">
                          {getDay(featuredEvent.event_date)}
                        </p>

                        <p className="text-sm font-black tracking-widest text-[var(--mnb-blue)]">
                          {getMonth(featuredEvent.event_date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12">
                      <div className="inline-flex items-center gap-2 text-sm font-bold text-[var(--mnb-blue)]">
                        <Clock3 size={17} />
                        Upcoming School Event
                      </div>

                      <h2 className="mt-5 text-3xl font-black leading-tight text-[var(--mnb-navy)] md:text-4xl">
                        {featuredEvent.title}
                      </h2>

                      <div className="mt-5 h-1 w-20 rounded-full bg-[var(--mnb-gold)]" />

                      <p className="mt-6 text-lg leading-8 text-gray-600">
                        {shortenText(featuredEvent.description, 320)}
                      </p>

                      <div className="mt-8 grid gap-4">
                        <div className="flex items-start gap-3 rounded-2xl bg-[var(--mnb-light)] p-4">
                          <CalendarDays
                            size={22}
                            className="mt-1 text-[var(--mnb-blue)]"
                          />

                          <div>
                            <p className="text-sm font-bold uppercase tracking-wide text-gray-500">
                              Date
                            </p>

                            <p className="mt-1 font-black text-[var(--mnb-navy)]">
                              {formatEventDate(featuredEvent.event_date)}
                            </p>
                          </div>
                        </div>

                        {featuredEvent.venue && (
                          <div className="flex items-start gap-3 rounded-2xl bg-[var(--mnb-light)] p-4">
                            <MapPin
                              size={22}
                              className="mt-1 text-[var(--mnb-blue)]"
                            />

                            <div>
                              <p className="text-sm font-bold uppercase tracking-wide text-gray-500">
                                Venue
                              </p>

                              <p className="mt-1 font-black text-[var(--mnb-navy)]">
                                {featuredEvent.venue}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* MORE EVENTS */}
              {remainingEvents.length > 0 && (
                <div className="mt-16">
                  <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="font-bold uppercase tracking-[.2em] text-[var(--mnb-gold)]">
                        School Calendar
                      </p>

                      <h2 className="mt-2 text-3xl font-black text-[var(--mnb-navy)] md:text-4xl">
                        More Upcoming Events
                      </h2>
                    </div>

                    <p className="max-w-xl text-gray-600">
                      Browse additional activities, meetings and important dates
                      scheduled at MNB College.
                    </p>
                  </div>

                  <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
                    {remainingEvents.map((event) => (
                      <article
                        key={event.id}
                        className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl"
                      >
                        <div className="relative h-60 overflow-hidden bg-slate-200">
                          {event.image_url ? (
                            <Image
                              src={event.image_url}
                              alt={event.title}
                              fill
                              className="object-cover transition duration-700 group-hover:scale-110"
                              unoptimized={String(event.image_url).startsWith(
                                "http"
                              )}
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center bg-gradient-to-br from-[var(--mnb-navy)] to-[var(--mnb-blue)] text-white">
                              <CalendarDays size={64} className="opacity-40" />
                            </div>
                          )}

                          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />

                          <div className="absolute bottom-4 left-4 rounded-2xl bg-white px-4 py-3 text-center shadow-lg">
                            <p className="text-2xl font-black text-[var(--mnb-navy)]">
                              {getDay(event.event_date)}
                            </p>

                            <p className="text-xs font-black tracking-widest text-[var(--mnb-blue)]">
                              {getMonth(event.event_date)}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="text-2xl font-black leading-snug text-[var(--mnb-navy)] transition group-hover:text-[var(--mnb-blue)]">
                            {event.title}
                          </h3>

                          <p className="mt-4 flex-1 leading-7 text-gray-600">
                            {shortenText(event.description)}
                          </p>

                          <div className="mt-6 space-y-3 border-t pt-5">
                            <p className="flex items-start gap-3 font-bold text-[var(--mnb-blue)]">
                              <CalendarDays size={18} className="mt-1 shrink-0" />
                              {formatEventDate(event.event_date)}
                            </p>

                            {event.venue && (
                              <p className="flex items-start gap-3 text-gray-600">
                                <MapPin size={18} className="mt-1 shrink-0" />
                                {event.venue}
                              </p>
                            )}
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
                <TicketCheck size={38} />
              </div>

              <h2 className="mt-6 text-2xl font-black text-[var(--mnb-navy)]">
                No Upcoming Events
              </h2>

              <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-500">
                There are currently no published events. Please check again
                later for school activities and important dates.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}