import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";

// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "ShopFlow - E-commerce Analytics Dashboard",
  description: "Modern dashboard pentru gestionarea magazinului online. Analytics în timp real, comenzi, clienți și rapoarte.",
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${inter.variable} ${poppins.variable} overflow-x-hidden`}>
      <body className="overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
        <Providers>
          <main className="max-w-[100vw] overflow-x-hidden">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}