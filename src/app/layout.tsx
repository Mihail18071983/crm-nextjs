import React from 'react';
import AuthProvider from './components/Provider';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Providers from '@/app/components/providers';
import './globals.css';

const font = Plus_Jakarta_Sans({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressContentEditableWarning
        suppressHydrationWarning
        className={font.className}
      >
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
