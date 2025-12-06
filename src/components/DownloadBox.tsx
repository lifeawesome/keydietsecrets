"use client";

import { useState } from "react";
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

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: title, // Track which download box they used
          fileUrl,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text:
            data.message || "Success! Check your email for the download link.",
        });
        setEmail(""); // Clear the form
      } else {
        setMessage({
          type: "error",
          text: data.error || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to send. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
      {label && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
          {label}
        </p>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 lg:text-xl">
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

        <div className="space-y-3">
          {hasDownload && (
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:bg-slate-100 disabled:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center rounded-full border border-emerald-600 bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : buttonLabel}
                </button>
              </div>

              {message && (
                <div
                  className={`mt-3 rounded-lg border p-3 text-sm ${
                    message.type === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                      : "border-red-200 bg-red-50 text-red-800"
                  }`}
                >
                  {message.text}
                </div>
              )}

              <p className="mt-3 text-xs text-slate-500">
                We'll send the download link to your email. No spam, ever.
              </p>
            </form>
          )}

          {hasAffiliate && (
            <Link
              href={affiliateUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-emerald-700 underline-offset-4 hover:underline"
            >
              View recommended product
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
