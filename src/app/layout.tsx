import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: "wonseok-han's portfolio",
  description: 'A portfolio of wonseok-han',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="robots" content="noindex, nofollow" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Analytics />
        <header className="sticky top-0 z-10 bg-dark border-b border-mint">
          <nav className="container mx-auto flex justify-between p-4">
            <a href="#about-me" className="hover:text-white font-semibold">
              About Me
            </a>
            <a href="#skills" className="hover:text-white font-semibold">
              Skills
            </a>
            <a href="#career" className="hover:text-white font-semibold">
              Career
            </a>
            <a href="#projects" className="hover:text-white font-semibold">
              Playgrounds
            </a>
          </nav>
        </header>
        <main className="flex-1 relative">{children}</main>
        <footer className="bg-dark text-center py-4 border-t border-mint">
          {`© ${new Date().getFullYear()} wonseok-han's page`}
        </footer>
      </body>
    </html>
  );
}
