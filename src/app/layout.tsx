import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@/styles/globals.css';

const roboto = Roboto({ subsets: ['latin'], weight: ['400'] });

export const metadata: Metadata = {
  title: 'betterbox',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={roboto.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}
