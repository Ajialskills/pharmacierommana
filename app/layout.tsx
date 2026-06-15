import { Inter, Cairo } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const lang = cookieStore.get("pr_lang")?.value === "ar" ? "ar" : "fr";
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <html
      lang={lang}
      dir={dir}
      className={`${inter.variable} ${cairo.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--color-background)] text-[var(--color-on-surface)]">
        {children}
      </body>
    </html>
  );
}
