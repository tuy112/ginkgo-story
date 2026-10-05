import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
      title: 'Ginkgo Story',
      description: '은행잎이 흩날리는 이야기 속으로',
};

export const viewport: Viewport = {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
      userScalable: false,
      viewportFit: 'cover',
};

export default function RootLayout({
      children,
}: Readonly<{
      children: React.ReactNode;
}>) {
      return (
            <html lang="ko">
                  <body>{children}</body>
            </html>
      );
}