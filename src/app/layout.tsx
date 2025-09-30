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
  icons: {
    icon: [
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
    ],
  },
};

/**
 * 루트 레이아웃 컴포넌트
 * 애플리케이션의 전역 레이아웃을 정의합니다
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark" suppressHydrationWarning>
      <head>
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics />
        {children}
      </body>
    </html>
  );
}
