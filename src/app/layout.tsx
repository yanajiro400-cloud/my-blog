import type { Metadata } from "next";
import { Montserrat, Noto_Sans_JP } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Jiro Blog",
    template: "%s | Jiro Blog",
  },
  description: "気になったこと、作ったもの、のんびり綴っています。",
  openGraph: {
    siteName: "Jiro Blog",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${montserrat.variable} ${notoSansJP.variable}`}>
      <body className="flex flex-col min-h-screen">
        <nav>
          <div className="nav-inner">
            <Link href="/" className="logo">Jiro Blog</Link>
            <div className="nav-links">
              <Link href="/blog">Blog</Link>
            </div>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
        <footer>
          <div className="footer-inner">
            <p className="footer-copy">© 2025 Jiro Blog</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
