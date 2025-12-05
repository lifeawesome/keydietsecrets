// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import Link from "next/link";

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
        <header className="border-b border-stone-200 bg-white shadow-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <Link href="/" className="group flex items-center gap-2">
              <div className="text-2xl font-bold tracking-tight transition-colors">
                Key
                <span className="text-emerald-600 group-hover:text-emerald-700">
                  Diet
                </span>
                Secrets
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
