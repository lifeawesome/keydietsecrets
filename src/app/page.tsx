// app/page.tsx
export default function HomePage() {
  return (
    <section className="space-y-12">
      <div className="rounded-2xl bg-gradient-to-br from-white to-emerald-50/30 p-10 shadow-lg ring-1 ring-stone-200/50 md:p-12">
        <h1 className="font-serif text-4xl font-bold leading-tight text-stone-900 md:text-5xl lg:text-6xl">
          The truth about what really works for weight loss.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-stone-700 md:text-xl">
          Cut through the noise with science-backed strategies that help you
          lose weight and keep it off. No gimmicks, no fads—just what actually
          works.
        </p>
        <form className="mt-8 flex flex-col gap-3 md:flex-row">
          <input
            type="email"
            placeholder="Enter your email for the 7-Day Fat-Loss Starter Kit"
            className="flex-1 rounded-lg border-2 border-stone-300 px-4 py-3.5 text-base shadow-sm transition-all placeholder:text-stone-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
          />
          <button
            type="submit"
            className="rounded-lg bg-emerald-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30"
          >
            Get the 7-Day Kit
          </button>
        </form>
        <p className="mt-3 text-sm text-stone-600">
          You&apos;ll get a simple 7-day meal plan plus the science behind why
          it works.
        </p>
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
