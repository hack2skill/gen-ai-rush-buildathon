'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGlobalContext } from '@/app/context/store';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    target?: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  const handleSave = () => {
    const selectedOption: any = document.querySelector('select')?.value;
    const apiKeyContainer: any = document.getElementById('api-key-container');

    if (
      selectedOption === 'openai' ||
      selectedOption === 'azureopenai' ||
      selectedOption === 'claude'
    ) {
      apiKeyContainer.style.display = 'block';
      const apiKeyInput = apiKeyContainer.querySelector('input');
      apiKeyInput.value = ''; // Clear the input field if it was previously filled
      apiKeyInput.focus(); // Set focus on the API key input field
    } else {
      apiKeyContainer.style.display = 'none';
    }

    // Additional logic to handle saving the changes and API key
  };

  return (
    <nav
      className={cn(
        'flex h-[80vh] flex-col space-x-2 border-r-2 border-gray-300 px-4 md:flex-row lg:flex-col lg:space-x-0 lg:space-y-1',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'hover:bg-muted bg-slate-300'
              : 'hover:bg-slate-200 hover:underline',
            'justify-start'
          )}
        >
          {item.title}
        </Link>
      ))}

      <div className="w-full p-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Settings</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Model Engine</DialogTitle>
              <DialogDescription>
                Pick your preferred models to use in your account.
              </DialogDescription>
            </DialogHeader>
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Your Large Language Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="openai">OpenAI</SelectItem>
                    <SelectItem value="azureopenai">Azure OpenAI</SelectItem>
                    <SelectItem value="claude">Claude</SelectItem>
                    <SelectItem value="dolly">Dolly</SelectItem>
                    <SelectItem value="llama">LLama</SelectItem>
                    <SelectItem value="falcon">Falcon</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div id="api-key-container">
              <Input type="text" placeholder="sk-***************************" />
            </div>
            <div>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Diffusion Model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="openai">Diffusers</SelectItem>
                    <SelectItem value="azureopenai">
                      Automatic1111 Api
                    </SelectItem>
                    <SelectItem value="claude">OpenAI dall-e</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSave}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>{' '}
      </div>
    </nav>
  );
}
