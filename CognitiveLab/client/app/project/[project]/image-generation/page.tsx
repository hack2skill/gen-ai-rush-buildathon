/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import { use, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios, { AxiosResponse } from 'axios';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Voice_generator() {
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split('/');
  const project = parts[2];

  const [loading, setLoading] = useState(false); // State to track if audio generation is in progress
  const [error, setError] = useState(null); // State to hold error message, if any
  const [model, setModel] = useState('');
  const [style, setStyle] = useState('');

  const [selectedModel, setSelectedModel] = useState(''); // State to track selected model
  const [selectedStyle, setSelectedStyle] = useState(''); // State to track selected style
  const [imageLinks, setImageLinks] = useState([]); // State to hold image links

  const [errorMessage, setErrorMessage] = useState('');

  const [generatedImages, setGeneratedImages] = useState([]);

  useEffect(() => {
    // Call the get-audio route on mount to check for the audio URL in the JSON file
    setLoading(true);
    axios
      .get(`${process.env.server_url}/get-images/${project}`)
      .then((response) => {
        setImageLinks(response.data[0].image_url);
        if (response.data[0].image_url.length > 0) {
          setGeneratedImages(response.data[0].image_url);
        } else {
          setGeneratedImages([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error occurred while fetching audio URL:', error);
        setLoading(false);
      });
  }, []);

  const handleGenerateImages = () => {
    setLoading(true);
    axios
      .post(`${process.env.server_url}/image-generate`, {
        project: project,
        model: model,
        style: style,
      })
      .then((response) => {
        console.log(response.data[0].message);
        setImageLinks(response.data[0].links);
        setGeneratedImages(response.data[0].links);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error occurred while generating audio:', error);
        setLoading(false);
        setError(error.message);
      });
  };

  const handleCompileVideo = () => {
    setLoading(true);
    axios
      .post(`${process.env.server_url}/video-generate/${project}`)
      .then((response) => {
        console.log(response.data.message);
        const url = response.data[0].video_url;
        router.push(`/project/${project}/export`);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error occurred while compiling video:', error);
      });
  };

  return (
    <section className="container grid items-center  pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Image Generation
        </h1>
      </div>
      <br />
      <h4 className="text-1xl font-extrabold leading-tight tracking-tighter md:text-1xl">
        Choose Model
      </h4>
      <div className="w-full flex justify-start items-center gap-3">
        {/* Use input type "radio" for the model options */}
        <input
          type="radio"
          id="base"
          name="model"
          value="base"
          checked={selectedModel === 'base'}
          onChange={(e) => setSelectedModel(e.target.value)}
        />
        <label htmlFor="base">Base Stable Diffusion</label>

        <input
          type="radio"
          id="dreamshaper"
          name="model"
          value="dreamshaper"
          checked={selectedModel === 'dreamshaper'}
          onChange={(e) => setSelectedModel(e.target.value)}
        />
        <label htmlFor="dreamshaper">DreamShaper</label>

        <input
          type="radio"
          id="majicmix"
          name="model"
          value="majicmix"
          checked={selectedModel === 'majicmix'}
          onChange={(e) => setSelectedModel(e.target.value)}
        />
        <label htmlFor="majicmix">majicMIX realistic</label>
      </div>
      <br />
      <h4 className="text-1xl font-extrabold leading-tight tracking-tighter md:text-1xl">
        Choose Style
      </h4>
      <div className="w-full flex justify-start items-center gap-3">
        {/* Use input type "radio" for the style options */}
        <input
          type="radio"
          id="anime"
          name="style"
          value="anime"
          checked={selectedStyle === 'anime'}
          onChange={(e) => setSelectedStyle(e.target.value)}
        />
        <label htmlFor="anime">Anime</label>

        <input
          type="radio"
          id="cartoon"
          name="style"
          value="cartoon"
          checked={selectedStyle === 'cartoon'}
          onChange={(e) => setSelectedStyle(e.target.value)}
        />
        <label htmlFor="cartoon">Cartoon</label>

        <input
          type="radio"
          id="realistic"
          name="style"
          value="realistic"
          checked={selectedStyle === 'realistic'}
          onChange={(e) => setSelectedStyle(e.target.value)}
        />
        <label htmlFor="realistic">Realistic</label>
      </div>
      <br />
      <Button onClick={handleGenerateImages} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Images'}
      </Button>

      {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}

      {/* Display generated images in a 3x3 grid */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {loading ? (
          <p className="text-gray-600">Generating images...</p>
        ) : generatedImages.length > 0 ? (
          generatedImages.map((imageLink, index) => (
            <img
              key={index}
              src={imageLink}
              alt={`Generated Image ${index + 1}`}
            />
          ))
        ) : (
          <p className="text-gray-600">No images generated yet.</p>
        )}
      </div>
      <Button className="mt-4" onClick={handleCompileVideo}>
        Compile Video
      </Button>
    </section>
  );
}
