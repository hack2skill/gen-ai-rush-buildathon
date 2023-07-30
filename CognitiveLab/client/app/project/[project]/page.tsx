'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
type Props = {};

const export_type = [
  {
    name: 'Video',
  },
  {
    name: 'Book',
  },
  {
    name: 'Flashcards',
  },
];
export default function Project() {
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split('/');
  const desiredPart = parts[2];

  const [selectedProjectType, setSelectedProjectType] = useState('');

  useEffect(() => {
    console.log('Type of Project');
  }, []);

  return (
    <section
      id="features"
      className="container space-y-3 bg-background_transparent  py-8 dark:bg-transparent md:py-12 lg:py-24 rounded-3xl"
    >
      <div className="mx-auto flex max-w-[58rem]  flex-col items-center space-y-4 text-center">
        <h3 className="font-heading text-2xl  leading-[1.1] sm:text-3xl md:text-4xl py-6">
          Type of Project
        </h3>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        {export_type.map((project, index) => (
          <button
            key={index}
            className={`relative overflow-hidden rounded-lg border bg-background p-2 hover:bg-slate-300 ${
              selectedProjectType === project.name ? 'bg-slate-300' : ''
            }`}
            onClick={() => setSelectedProjectType(project.name)}
          >
            <div className="flex flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">{project.name}</h3>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="w-full flex justify-center items-center pt-6">
        <Button
          className="w-4/6"
          onClick={() => {
            console.log('Content Generation');
            router.push(`/project/${desiredPart}/content-generation`);
          }}
        >
          Content Generation
        </Button>
      </div>
    </section>
  );
}
