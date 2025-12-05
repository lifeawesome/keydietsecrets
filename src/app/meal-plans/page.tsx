// app/meal-plans/page.tsx
import { getArticlesByCategorySlug } from "@/lib/queries";
import Link from "next/link";

export default async function MealPlansPage() {
  const articles = await getArticlesByCategorySlug("meal-plans");

  return (
    <section className="space-y-10">
      <header className="space-y-4">
        <div className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
          Meal Plans
        </div>
        <h1 className="font-serif text-4xl font-bold text-stone-900 md:text-5xl">
          Meal Plans
        </h1>
        <p className="max-w-3xl text-lg leading-relaxed text-stone-600">
          Science-backed meal plans that help you lose weight and keep it off.
        </p>
      </header>

      <div className="space-y-6">
        {articles.length === 0 && (
          <div className="rounded-2xl bg-white p-12 text-center shadow-md ring-1 ring-stone-200/50">
            <div className="mx-auto mb-4 inline-flex rounded-full bg-stone-100 p-4">
              <svg className="h-8 w-8 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <p className="text-lg font-medium text-stone-700">Articles coming soon.</p>
            <p className="mt-2 text-sm text-stone-500">
              We&apos;re working on creating comprehensive, evidence-based content for you.
            </p>
          </div>
        )}
        {articles.map((article) => (
          <article
            key={article._id}
            className="group rounded-2xl bg-white p-8 shadow-md ring-1 ring-stone-200/50 transition-all hover:shadow-xl hover:ring-emerald-200"
          >
            <h2 className="text-2xl font-semibold text-stone-900 transition-colors group-hover:text-emerald-600">
              <Link href={`/meal-plans/${article.slug.current}`}>
                {article.title}
              </Link>
            </h2>
            {article.excerpt && (
              <p className="mt-3 leading-relaxed text-stone-600">{article.excerpt}</p>
            )}
            <Link
              href={`/meal-plans/${article.slug.current}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
            >
              Read article
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
