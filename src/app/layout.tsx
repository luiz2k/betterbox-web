import { Roboto } from "next/font/google";
import "@/styles/globals.css";

import Header from "@/components/Header/Header";
import AuthModal from "@/components/AuthModal/AuthModal";

import TanStackQueryProvider from "@/providers/TanStackQueryProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import VerifyAutentication from "@/components/VerifyAutentication/VerifyAutentication";
import SessionProvider from "@/providers/SessionProvider";

const roboto = Roboto({ subsets: ["latin"], weight: ["400"] });
export const metadata = { icons: { icon: "/logo.png" } };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body className={roboto.className}>
        <VerifyAutentication>
          <SessionProvider>
            <ThemeProvider attribute="class" defaultTheme="system">
              <Header />
              <AuthModal />
              <main className="mx-auto mt-20 max-w-5xl px-5 py-10">
                <TanStackQueryProvider>{children}</TanStackQueryProvider>
              </main>
            </ThemeProvider>
          </SessionProvider>
        </VerifyAutentication>
      </body>
    </html>
  );
}
