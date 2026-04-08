import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

const rightGrotesk = localFont({
  src: "../../public/fonts/RightGrotesk-Medium.otf",
  variable: "--font-right-grotesk",
});

export const metadata: Metadata = {
  title: "Klirô Admin",
  description: "Plateforme d'administration Klirô",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={rightGrotesk.variable}>
      <body className="min-h-screen font-sans">
        <Sidebar />
        <div className="ml-64 flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
