'use client';

import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SiteHeader } from '@/components/site-header';
import { GlobalContextProvider } from '@/app/context/store';

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Storyweave.ai',
  description: 'Weave Your Stories, Captivate Your Audience with AI',
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <GlobalContextProvider>
        <html lang="en" suppressHydrationWarning>
          <head />
          <body>
            <SiteHeader />
            <div className="space-y-6 p-2 pb-16 md:block md:p-10">
              <div className="lg:max-w-5/6 flex-1">{children}</div>
            </div>
          </body>
        </html>
      </GlobalContextProvider>
    </>
  );
}
