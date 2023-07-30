/* eslint-disable @next/next/no-img-element */
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-tree">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={siteConfig.links.twitter}
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow along on Twitter
          </Link>

          <div className="flex justify-center items-center">
            <img src="./logo.png" alt="" />

            <div className="font-bold italic text-white text-2xl">.ai</div>
          </div>

          <div className="space-x-4">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              Get Started
            </Link>
            {/* <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            >
              GitHub
            </Link> */}
          </div>
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-background_transparent  py-8 dark:bg-transparent md:py-12 lg:py-24 rounded-3xl"
      >
        <div className="mx-auto flex max-w-[58rem]  flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl  leading-[1.1] sm:text-3xl md:text-6xl">
            Features
          </h2>
          <p className="max-w-[85%] leading-normal text-foreground font-semibold sm:text-lg sm:leading-7">
            Weave Your Stories, Captivate Your Audience with AI
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[120px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">
                  Effortlessly craft captivating stories, videos, and more with
                  AI assistance.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2 ">
            <div className="flex h-[120px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Multi-Format Export</h3>
                <p className="text-sm">
                  Share your creations easily with seamless export to various
                  formats.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[120px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Custom Styles</h3>
                <p className="text-sm text-muted-foreground">
                  Personalize your content with unique styles that captivate
                  your audience.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[120px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Automation</h3>
                <p className="text-sm text-muted-foreground">
                  Directly upload to YouTube, Twitter, and other social media
                  platforms with automated sharing features.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[120px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Consistency</h3>
                <p className="text-sm text-muted-foreground">
                  Character are consistent across all your stories.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[120px] flex-col justify-between rounded-md p-6">
              <div className="space-y-2">
                <h3 className="font-bold">Built-in API</h3>
                <p className="text-sm text-muted-foreground">
                  Our platform provides its own API for seamless integration
                  with external tools and platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-white text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Coming Out soons
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Subscribe for updates on the project
            {/* <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link> */}
            .{' '}
          </p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" />
            <Button type="submit">Subscribe</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
