import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { MainNav } from '@/components/main-nav';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background ">
      <div className=" px-10 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav />
      </div>
    </header>
  );
}
