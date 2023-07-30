/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
'use client';

import { useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import axios, { AxiosResponse } from 'axios';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function Content_generation() {
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split('/');
  const project = parts[2];
  const [image, setImage] = useState<File | null>(null);
  const [createObjectURL, setCreateObjectURL] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<any>(null);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isEditable, setIsEditable] = useState<boolean>(false);

  // New states for plot, genre, and duration
  const [plot, setPlot] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [duration, setDuration] = useState<string>('');

  useEffect(() => {
    // Make a GET request to fetch the content for the specified project
    axios
      .get(`${process.env.server_url}/get-content/${project}`)
      .then((response) => {
        // Check if content is not null and update the state
        if (response.data.content !== null) {
          setGeneratedContent(response.data.content);
        }
      })
      .catch((error) => {
        console.error('Error occurred while loading content:', error);
        // Handle error if content loading fails
      });
  }, [project]);

  const handleSave = () => {
    axios
      .post(`${process.env.server_url}/content-save`, {
        project: project, // Replace with the actual project name
        content: generatedContent,
      })
      .then((response) => {
        console.log(response.data.message);
        setIsEditable(false);
        // You can show a success message or perform other actions after saving the content
      })
      .catch((error) => {
        console.error('Error occurred while saving content:', error);
        setIsEditable(false);
        // Handle error if content saving fails
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Check if plot, genre, and duration fields are not empty
    if (!plot || !genre || !duration) {
      // Fields are empty, don't set success message or send the request
      setSuccessMessage('Please fill all the fields');
      return;
    }

    setSuccessMessage('Ai is Generating Description...');

    const requestBody = {
      project,
      plot,
      genre,
      duration,
    };

    const requestBody_v2 = {
      project: project,
    };

    axios
      .post(`${process.env.server_url}/content-generate`, requestBody)
      .then((response: AxiosResponse) => {
        console.log(response.data[0]);
        setGeneratedContent(response.data[0].story);
        setSuccessMessage('Content Generated');
        axios
          .post(`${process.env.server_url}/content-generate-v2`, requestBody_v2)
          .then((response: AxiosResponse) => {
            console.log(response.data[0]);
          })
          .catch((error: any) => {
            console.error(error);
          });
      })
      .catch((error: any) => {
        setGeneratedContent('Error Occurred while generating content');
        console.error(error);
        setSuccessMessage('Error Generating Description');
      });
  };

  // ... Existing handlers ...

  return (
    <section className="container grid items-center  pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Content Generation
        </h1>
      </div>
      <div className="py-4">
        {generatedContent ? (
          <>
            {isEditable ? (
              <Textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                className="w-full mb-4"
                rows={10}
              />
            ) : (
              <p>{generatedContent}</p>
            )}

            {isEditable ? (
              <button onClick={handleSave} className={buttonVariants()}>
                Save
              </button>
            ) : (
              <div className="my-4">
                <button
                  onClick={() => setIsEditable(true)}
                  className={buttonVariants()}
                >
                  Edit
                </button>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <img src={createObjectURL} className="max-w-[50%] py-2" />
          <Label htmlFor="plot">Plot</Label>
          <Textarea
            id="plot"
            onChange={(e) => setPlot(e.target.value)}
            // type="text"
            className="mb-4 w-[30vw]"
            placeholder="Give a short plot description"
          />
          <Label htmlFor="genre">Genre</Label>
          <Input
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
            type="text"
            className="mb-4 w-[30vw]"
            placeholder="e.g., Adventure, Suspense, etc."
          />
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            onChange={(e) => setDuration(e.target.value)}
            type="text"
            className="mb-4 w-[30vw]"
            placeholder="Rough duration of the video in minutes"
          />

          <button type="submit" className={buttonVariants()}>
            Generate Content
          </button>
        </form>
        {successMessage && <p>{successMessage}</p>}

        <div className="w-full flex justify-end items-center pt-6">
          <Button
            className="w-full"
            onClick={() => {
              router.push(`/project/${project}/voice-generation`);
              handleSave();
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}
