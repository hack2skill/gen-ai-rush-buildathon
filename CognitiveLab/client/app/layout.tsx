import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { GlobalContextProvider, useGlobalContext } from '@/app/context/store';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Storyweave.ai',
  description: 'Weave Your Stories, Captivate Your Audience with AI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalContextProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </GlobalContextProvider>
  );
}
