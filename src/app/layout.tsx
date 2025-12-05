// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import Link from "next/link";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Key Diet Secrets",
  description: "The truth about what really works for weight loss.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <body
        className="bg-stone-50 text-stone-900"
        style={{ fontFamily: "var(--font-inter)" }}
      >
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KK9HKWG5');`,
          }}
        />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KK9HKWG5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <header className="border-b border-stone-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <Link
              href="/"
              className="group flex items-center gap-3 transition-all hover:scale-105"
            >
              {/* Key Icon */}
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-20 blur group-hover:opacity-30 transition-opacity"></div>
                <div className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-600/25">
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                    />
                  </svg>
                </div>
              </div>
              {/* Logo Text */}
              <div className="flex flex-col">
                <div className="text-xl font-extrabold leading-none tracking-tight text-stone-900">
                  <span className="text-stone-900">Key</span>
                  <span className="text-emerald-600">Diet</span>
                  <span className="text-stone-900">Secrets</span>
                </div>
                <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-stone-500">
                  Science-Based Weight Loss
                </div>
              </div>
            </Link>
            <nav className="flex gap-8 text-[15px] font-medium">
              <Link
                href="/weight-loss"
                className="text-stone-700 transition-colors hover:text-emerald-600"
              >
                Weight Loss
              </Link>
              <Link
                href="/meal-plans"
                className="text-stone-700 transition-colors hover:text-emerald-600"
              >
                Meal Plans
              </Link>
              <Link
                href="/supplements"
                className="text-stone-700 transition-colors hover:text-emerald-600"
              >
                Supplements
              </Link>
              <Link
                href="/tools-and-tech"
                className="text-stone-700 transition-colors hover:text-emerald-600"
              >
                Tools & Tech
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
        <footer className="border-t border-stone-200 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-stone-600">
            <p>
              © {new Date().getFullYear()} KeyDietSecrets.com – The truth about
              what really works for weight loss.
            </p>
            <p className="mt-2 text-xs text-stone-500">
              Evidence-based information for sustainable weight loss.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
