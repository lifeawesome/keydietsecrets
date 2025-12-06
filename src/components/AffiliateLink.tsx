"use client";

import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/lib/sanity";

type AffiliateLinkProps = {
  linkType: "text" | "image" | "button";
  linkText?: string | null;
  image?: any;
  imageUrl?: string | null;
  alt?: string | null;
  url: string;
  openInNewTab?: boolean;
  description?: string | null;
};

export function AffiliateLink({
  linkType,
  linkText,
  image,
  imageUrl,
  alt,
  url,
  openInNewTab = true,
  description,
}: AffiliateLinkProps) {
  if (!url) return null;

  const linkProps = {
    href: url,
    ...(openInNewTab && {
      target: "_blank",
      rel: "noopener noreferrer sponsored",
    }),
    ...(!openInNewTab && {
      rel: "sponsored",
    }),
  };

  const renderLink = () => {
    if (linkType === "image" && (image || imageUrl)) {
      // Use remote URL if provided, otherwise use Sanity image
      const finalImageUrl = imageUrl || urlForImage(image).url();

      return (
        <Link
          {...linkProps}
          className="block transition-opacity hover:opacity-80"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={finalImageUrl}
              alt={alt || "Affiliate product"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            />
          </div>
        </Link>
      );
    }

    if (linkType === "button") {
      return (
        <Link
          {...linkProps}
          className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-emerald-600 bg-emerald-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-600/30"
        >
          {linkText || "View Product"}
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </Link>
      );
    }

    // Default: text link
    return (
      <Link
        {...linkProps}
        className="font-semibold text-emerald-600 underline decoration-emerald-600/30 underline-offset-4 transition-colors hover:text-emerald-700 hover:decoration-emerald-700"
      >
        {linkText || url}
      </Link>
    );
  };

  return (
    <div className="my-6">
      {renderLink()}
      {description && (
        <p className="mt-3 text-sm text-slate-600">{description}</p>
      )}
      {linkType !== "text" && (
        <p className="mt-2 text-xs text-slate-500">
          <em>
            Affiliate link: We may earn a commission at no extra cost to you.
          </em>
        </p>
      )}
    </div>
  );
}
