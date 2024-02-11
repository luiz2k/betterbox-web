import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/Header/Header";

import TanStackQueryProvider from "@/providers/TanStackQueryProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "betterbox",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <Header />
          <main className="mx-auto mt-20 max-w-5xl px-5 py-10">
            <TanStackQueryProvider>{children}</TanStackQueryProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
