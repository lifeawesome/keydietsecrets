"use client";

import Link from "next/link";
import { useState } from "react";

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
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");
  const hasDownload = Boolean(fileUrl);
  const hasAffiliate = Boolean(affiliateUrl);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          source: "article_download",
          fileUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit email");
      }

      setSubmittedEmail(email);
      setIsSubmitted(true);
      setEmail(""); // Clear the form
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
      console.error("Email submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm md:p-8">
      {label && (
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
          {label}
        </p>
      )}

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">
            {title}
          </h3>
          {description && (
            <p className="mt-2 text-sm leading-relaxed text-slate-700">
              {description}
            </p>
          )}
        </div>

        {hasDownload && (
          <div className="space-y-3">
            {!isSubmitted ? (
              <form onSubmit={handleEmailSubmit} className="space-y-3">
                <div>
                  <label
                    htmlFor="download-email"
                    className="block text-sm font-medium text-slate-700 mb-1"
                  >
                    Enter your email to receive the file
                  </label>
                  <input
                    id="download-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={isSubmitting}
                    className="w-full rounded-lg border-2 border-slate-300 bg-white px-4 py-2.5 text-sm shadow-sm transition-all placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {error && (
                    <p className="mt-1 text-xs text-red-600">{error}</p>
                  )}
                  <p className="mt-1 text-xs text-slate-500">
                    We&apos;ll email the file directly to you. No spam,
                    unsubscribe anytime.
                  </p>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-sky-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Me the File"}
                </button>
              </form>
            ) : (
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 space-y-2">
                <div className="flex items-start gap-2">
                  <svg
                    className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5"
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
                  <div>
                    <p className="text-sm font-semibold text-emerald-900">
                      Check your email!
                    </p>
                    <p className="text-sm text-emerald-800 mt-1">
                      We&apos;ve sent the file to{" "}
                      <strong>{submittedEmail}</strong>. Please check your inbox
                      (and spam folder if you don&apos;t see it).
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {hasAffiliate && (
          <div className="pt-3 border-t border-slate-200">
            <Link
              href={affiliateUrl!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-medium text-sky-700 underline-offset-4 hover:underline"
            >
              View recommended product
            </Link>
            <p className="mt-2 text-xs text-slate-500">
              This resource may include recommendations with affiliate links. If
              you choose to purchase through them, we may earn a small
              commission at no extra cost to you. It helps support
              KeyDietSecrets and keeps guides like this free.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
