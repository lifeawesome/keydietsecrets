// app/page.tsx
export default function HomePage() {
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
              The truth about what really works for weight loss.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-stone-700 md:text-xl">
              Cut through the noise with science-backed strategies that help you
              lose weight and keep it off. No gimmicks, no fads—just what
              actually works.
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
          <div className="flex flex-col justify-center">
            <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/50 p-8 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-stone-900">
                    Free 7-Day Starter Kit
                  </h3>
                  <p className="text-sm text-stone-600">Get started today</p>
                </div>
              </div>

              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full rounded-lg border-2 border-emerald-300 bg-white px-4 py-3.5 text-base shadow-sm transition-all placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <button
                  type="submit"
                  className="w-full rounded-lg bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30"
                >
                  Get Your Free Kit →
                </button>
              </form>

              <div className="mt-4 flex items-start gap-2 text-sm text-stone-600">
                <svg
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p>
                  Includes a complete 7-day meal plan, shopping list, and the
                  science explaining why it works.
                </p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-6 flex items-center gap-2 text-sm text-stone-500">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 ring-2 ring-white"
                  ></div>
                ))}
              </div>
              <span>Join 1,000+ people on their weight loss journey</span>
            </div>
          </div>
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
          <a
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
          </a>
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
          <a
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
          </a>
        </div>
      </div>
    </section>
  );
}
