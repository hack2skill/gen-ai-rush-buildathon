import * as React from 'react';
import Link from 'next/link';

import { NavItem } from '@/types/nav';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

export function MainNav() {
  const items = [
    {
      title: 'Home',
      href: '/',
      disabled: 0,
      external: 1,
    },
    {
      title: 'Dashboard',
      href: '/dashboard',
      disabled: 0,
      external: 1,
    },
    {
      title: 'Account',
      href: '/',
      disabled: 0,
      external: 1,
    },
  ];
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <img
          className="p-1 h-[60px]"
          src="https://res.cloudinary.com/dbl53sidm/image/upload/v1690626747/text-1690614798261_cqolpx.png"
          alt=""
        />
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    'flex items-center text-sm font-medium text-muted-foreground',
                    item.disabled && 'cursor-not-allowed opacity-80'
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
