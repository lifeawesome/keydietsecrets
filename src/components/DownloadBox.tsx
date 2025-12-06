"use client";

import Link from "next/link";

type DownloadBoxProps = {
  label?: string | null;
  title: string;
  description?: string | null;
  buttonLabel?: string | null;
  fileUrl?: string | null; // resolved from Sanity file
  affiliateUrl?: string | null; // optional affiliate link
};

export function DownloadBox({
  label,
  title,
  description,
  buttonLabel = "Download Now",
  fileUrl,
  affiliateUrl,
}: DownloadBoxProps) {
  const hasDownload = Boolean(fileUrl);
  const hasAffiliate = Boolean(affiliateUrl);

  return (
    <section className="my-10 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm md:p-8">
      {label && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
          {label}
        </p>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">
            {title}
          </h3>
          {description && (
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {description}
            </p>
          )}

          {hasAffiliate && (
            <p className="mt-3 text-xs text-slate-500">
              This resource may include recommendations with affiliate links. If
              you choose to purchase through them, we may earn a small
              commission at no extra cost to you. It helps support
              KeyDietSecrets and keeps guides like this free.
            </p>
          )}
        </div>

        <div className="flex flex-col gap-3 md:items-end">
          {hasDownload && (
            <Link
              href={fileUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-sky-600 bg-sky-600 px-6 py-2.5 text-sm font-semibold text-sky-50 shadow-sm transition hover:bg-sky-700 hover:text-white"
            >
              {buttonLabel}
            </Link>
          )}

          {hasAffiliate && (
            <Link
              href={affiliateUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-sky-700 underline-offset-4 hover:underline"
            >
              View recommended product
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
