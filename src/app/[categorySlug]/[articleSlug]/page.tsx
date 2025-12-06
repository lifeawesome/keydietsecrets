// app/[categorySlug]/[slug]/page.tsx
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { getArticleBySlug } from "@/lib/queries";
import Link from "next/link";
import { DownloadBox } from "@/components/DownloadBox";

type Props = {
  params: {
    categorySlug: string;
    articleSlug: string;
  };
};

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.articleSlug);

  if (!article) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-bold text-stone-900">
            Article not found
          </h1>
          <p className="mt-2 text-stone-600">
            The article you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl">
      <header className="mb-10 space-y-4">
        {article.category && (
          <div className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-800">
            {article.category.title}
          </div>
        )}
        <h1 className="font-serif text-4xl font-bold leading-tight text-stone-900 md:text-5xl">
          {article.title}
        </h1>
        {article.publishedAt && (
          <p className="text-sm text-stone-500">
            Published on{" "}
            {new Date(article.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </header>

      {article.body && (
        <div className="prose prose-lg prose-stone rounded-2xl bg-white p-8 shadow-lg ring-1 ring-stone-200/50 md:p-12">
          <PortableText
            value={article.body as PortableTextBlock[]}
            components={{
              types: {
                downloadBox: ({
                  value,
                }: {
                  value: {
                    label?: string | null;
                    title: string;
                    description?: string | null;
                    buttonLabel?: string | null;
                    fileUrl?: string | null;
                    affiliateUrl?: string | null;
                  };
                }) => (
                  <DownloadBox
                    label={value.label}
                    title={value.title}
                    description={value.description}
                    buttonLabel={value.buttonLabel}
                    fileUrl={value.fileUrl}
                    affiliateUrl={value.affiliateUrl}
                  />
                ),
              },
            }}
          />
        </div>
      )}
    </article>
  );
}
