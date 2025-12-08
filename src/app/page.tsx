// app/page.tsx
import Link from "next/link";
import { getSiteSettings } from "@/lib/queries";
import { HeroCTA } from "@/components/HeroCTA";

export default async function HomePage() {
  const settings = await getSiteSettings();

  return (
    <section className="space-y-12">
      {/* Hero Section */}
      <div className="rounded-2xl bg-white p-10 shadow-lg ring-1 ring-stone-200/50 md:p-12 lg:p-16">
        {/* Trust Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          Science-Backed & Evidence-Based
        </div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Main Content */}
          <div>
            <h1 className="font-serif text-4xl font-bold leading-tight text-stone-900 md:text-5xl lg:text-6xl">
              The truth about what actually works for losing weight.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-700 md:text-xl">
              Cut through the fat-loss fluff with science-backed strategies that
              help you lose weight and keep it off. No gimmicks, no fads—just
              what actually works.
            </p>

            {/* Key Benefits */}
            <div className="mt-8 space-y-3">
              {[
                "Evidence-based nutrition guidance",
                "Sustainable habits, not crash diets",
                "Real results backed by research",
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100">
                    <svg
                      className="h-4 w-4 text-emerald-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-stone-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - CTA Box */}
          {settings?.heroCta && (
            <HeroCTA
              badge={settings.heroCta.badge}
              subtitle={settings.heroCta.subtitle}
              buttonText={settings.heroCta.buttonText}
              description={settings.heroCta.description}
              fileUrl={settings.heroCta.fileUrl}
              socialProof={settings.heroCta.socialProof}
            />
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
        <div className="group rounded-2xl bg-white p-8 shadow-md ring-1 ring-stone-200/50 transition-all hover:shadow-xl hover:ring-emerald-200">
          <div className="mb-4 inline-flex rounded-lg bg-emerald-50 p-3">
            <svg
              className="h-6 w-6 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-stone-900">
            Start with the basics
          </h2>
          <p className="mt-3 leading-relaxed text-stone-600">
            New here? Begin with our guide on how weight loss actually
            works—without the myths.
          </p>
          <Link
            href="/weight-loss"
            className="mt-5 inline-flex items-center gap-2 font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
          >
            Explore weight loss guides
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
        <div className="group rounded-2xl bg-white p-8 shadow-md ring-1 ring-stone-200/50 transition-all hover:shadow-xl hover:ring-emerald-200">
          <div className="mb-4 inline-flex rounded-lg bg-emerald-50 p-3">
            <svg
              className="h-6 w-6 text-emerald-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-stone-900">
            Tools that really help
          </h2>
          <p className="mt-3 leading-relaxed text-stone-600">
            From smart scales to tracking apps, see which tools are worth your
            time and money.
          </p>
          <Link
            href="/tools-and-tech"
            className="mt-5 inline-flex items-center gap-2 font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
          >
            See our recommendations
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
