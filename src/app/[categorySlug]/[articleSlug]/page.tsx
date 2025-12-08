// app/[categorySlug]/[slug]/page.tsx
import { PortableText, PortableTextBlock } from "@portabletext/react";
import { getArticleBySlug } from "@/lib/queries";
import Link from "next/link";
import { DownloadBox } from "@/components/DownloadBox";
import { ImageBlock } from "@/components/ImageBlock";
import { AffiliateLink } from "@/components/AffiliateLink";
import { AffiliateOfferReference } from "@/components/AffiliateOfferReference";

type DownloadBoxType = {
  _type: "downloadBox";
  label?: string | null;
  title: string;
  description?: string | null;
  buttonLabel?: string | null;
  fileUrl?: string | null;
  affiliateUrl?: string | null;
};

type Props = {
  params: Promise<{
    categorySlug: string;
    articleSlug: string;
  }>;
};

export default async function ArticlePage({ params }: Props) {
  const { articleSlug } = await params;
  const article = await getArticleBySlug(articleSlug);

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

  // Extract download boxes from body content for sidebar
  const downloadBoxes =
    article.body
      ?.filter((block) => block._type === "downloadBox")
      .map((box) => {
        const downloadBox = box as unknown as DownloadBoxType;
        return {
          label: downloadBox.label,
          title: downloadBox.title,
          description: downloadBox.description,
          buttonLabel: downloadBox.buttonLabel,
          fileUrl: downloadBox.fileUrl,
          affiliateUrl: downloadBox.affiliateUrl,
        };
      }) || [];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_380px]">
        {/* Main Content Column */}
        <article className="min-w-0">
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

          {/* Download Box on Mobile/Tablet (shown inline, hidden on desktop) */}
          {downloadBoxes.length > 0 && (
            <div className="mb-8 lg:hidden">
              {downloadBoxes.map((box, idx: number) => (
                <DownloadBox key={idx} {...box} />
              ))}
            </div>
          )}

          {article.body && (
            <div className="prose prose-lg prose-stone rounded-2xl bg-white p-8 shadow-lg ring-1 ring-stone-200/50 md:p-12">
              <PortableText
                value={article.body as PortableTextBlock[]}
                components={{
                  types: {
                    downloadBox: () => {
                      // Don't render download boxes inline - they're in the sidebar
                      return null;
                    },
                    imageBlock: ({ value }) => (
                      <div className="not-prose">
                        <ImageBlock
                          image={value.image}
                          alt={value.alt}
                          caption={value.caption}
                        />
                      </div>
                    ),
                    affiliateLink: ({ value }) => (
                      <div className="not-prose">
                        <AffiliateLink
                          linkType={value.linkType}
                          linkText={value.linkText}
                          image={value.image}
                          imageUrl={value.imageUrl}
                          alt={value.alt}
                          url={value.url}
                          openInNewTab={value.openInNewTab}
                          description={value.description}
                        />
                      </div>
                    ),
                    affiliateOfferReference: ({ value }) => (
                      <div className="not-prose">
                        <AffiliateOfferReference
                          offer={value.offer}
                          overrideText={value.overrideText}
                          overrideDescription={value.overrideDescription}
                        />
                      </div>
                    ),
                  },
                }}
              />
            </div>
          )}
        </article>

        {/* Sidebar Column (visible only on desktop) */}
        {downloadBoxes.length > 0 && (
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-6">
              {downloadBoxes.map((box, idx: number) => (
                <DownloadBox key={idx} {...box} />
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
