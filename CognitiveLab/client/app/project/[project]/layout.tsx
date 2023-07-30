'use client';

import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SidebarNav } from '@/components/sidebar-nav';
import { SiteHeader } from '@/components/site-header';
import { useGlobalContext } from '@/app/context/store';
import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'Storyweave.ai',
  description: 'Weave Your Stories, Captivate Your Audience with AI',
};

export default function RootLayout({ children }: RootLayoutProps) {
  const pathname = usePathname();
  const parts = pathname.split('/');
  const desiredPart = parts[2];

  console.log(desiredPart);
  const sidebarNavItems = [
    {
      title: 'Content',
      href: `/project/${desiredPart}/content-generation`,
    },
    {
      title: 'Voice',
      href: `/project/${desiredPart}/voice-generation`,
    },
    {
      title: 'Visuals',
      href: `/project/${desiredPart}/image-generation`,
    },
    {
      title: 'Export',
      href: `/project/${desiredPart}/export`,
    },
  ];

  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />

        <div className="space-y-6 p-2 pb-16 md:block md:p-10">
          <div className="flex flex-col lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 h-fit md:h-fit lg:w-1/6">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <div className="lg:max-w-5/6 flex-1">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
