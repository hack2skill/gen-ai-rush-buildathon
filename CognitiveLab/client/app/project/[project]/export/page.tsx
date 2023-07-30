'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
type Props = {};

const export_type = [
  {
    name: 'Download',
  },
  {
    name: 'Upload to Youtube',
  },
  {
    name: 'View in Browser',
  },
];

export default function Project() {
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split('/');
  const desiredPart = parts[2];

  const [selectedProjectType, setSelectedProjectType] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.server_url}/get-video/${desiredPart}`)
      .then((response) => {
        console.log(response.data);
        setVideoUrl(response.data[0].video_url);
      })
      .catch((error) => {
        console.error('Error occurred while fetching video URL:', error);
      });
  }, [desiredPart]);

  const handleDownload = () => {
    // Add logic to handle download from the videoUrl
    window.location.href = videoUrl; // This will trigger the download of the video
  };

  const handleUploadToYoutube = () => {
    // Add logic to call the "upload" API route for uploading to YouTube
    // Assuming you have the appropriate API endpoint for the upload
    axios
      .post(`${process.env.server_url}/upload-to-youtube`, { videoUrl })
      .then((response) => {
        // Handle the response if needed
      })
      .catch((error) => {
        console.error('Error occurred while uploading to YouTube:', error);
      });
  };

  return (
    <section
      id="features"
      className="container space-y-3 bg-background_transparent  py-8 dark:bg-transparent md:py-12 lg:py-24 rounded-3xl"
    >
      <div className="mx-auto flex max-w-[58rem]  flex-col items-center space-y-4 text-center">
        <h3 className="font-heading text-2xl  leading-[1.1] sm:text-3xl md:text-4xl py-6">
          Export Your Project
        </h3>
      </div>
      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
        <button
          className={`relative overflow-hidden rounded-lg border bg-background p-2 hover:bg-slate-300 `}
          onClick={handleDownload}
        >
          <div className="flex flex-col justify-between rounded-md p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Download</h3>
            </div>
          </div>
        </button>
        <button
          className={`relative overflow-hidden rounded-lg border bg-background p-2 hover:bg-slate-300 `}
          onClick={() => {
            setSelectedProjectType('View in Browser');
          }}
        >
          <div className="flex flex-col justify-between rounded-md p-6">
            <div className="space-y-2">
              <h3 className="font-bold">View in Browser</h3>
            </div>
          </div>
        </button>
        <button
          className={`relative overflow-hidden rounded-lg border bg-background p-2 hover:bg-slate-300 `}
          onClick={handleUploadToYoutube}
        >
          <div className="flex flex-col justify-between rounded-md p-6">
            <div className="space-y-2">
              <h3 className="font-bold">Upload to YT</h3>
            </div>
          </div>
        </button>
      </div>
      {selectedProjectType === 'View in Browser' && videoUrl && (
        <div className="mx-auto max-w-[58rem]">
          <video controls>
            <source src={videoUrl} type="video/mp4" />
            {/* Add more source tags for other video formats if needed */}
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </section>
  );
}
