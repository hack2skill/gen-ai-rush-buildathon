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

export default function Voice_generator() {
  const router = useRouter();
  const pathname = usePathname();
  const parts = pathname.split('/');
  const project = parts[2];

  const [loading, setLoading] = useState(false); // State to track if audio generation is in progress
  const [error, setError] = useState(null); // State to hold error message, if any
  const [audioUrl, setAudioUrl] = useState('');
  const [voiceType, setVoiceType] = useState(''); // State for the type of voice (male/female)
  const [voiceTypeText, setVoiceTypeText] = useState(''); // State for the type of voice (male/female)
  const [paceOfVoice, setPaceOfVoice] = useState(''); // State for the pace of the voice (number)

  const [audioUrlFromJson, setAudioUrlFromJson] = useState('');

  useEffect(() => {
    // Call the get-audio route on mount to check for the audio URL in the JSON file
    axios
      .get(`${process.env.server_url}/get-audio/${project}`)
      .then((response) => {
        const audioUrlFromJson = response.data[0].audio_url;
        setAudioUrlFromJson(audioUrlFromJson);
        setAudioUrl(audioUrlFromJson);
      })
      .catch((error) => {
        console.error('Error occurred while fetching audio URL:', error);
      });
  }, [project]);

  const handleGenerateVoice = () => {
    setLoading(true);
    axios
      .post(`${process.env.server_url}/voice-generate`, {
        project: project,
        gender: voiceType,
      })
      .then((response) => {
        console.log(response.data.message);
        const url = response.data[0].audio_url;
        setAudioUrl(url);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error occurred while generating audio:', error);
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <section className="container grid items-center  pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Voice Generation
        </h1>
        <form className="flex flex-col gap-4">
          <Label htmlFor="voiceType">Type of Voice</Label>
          <Input
            type="text"
            id="voiceTypeText"
            value={voiceTypeText}
            onChange={(e) => setVoiceTypeText(e.target.value)}
            placeholder="Intense, Masculine, etc."
          />
          {/* <Label htmlFor="voiceType"></Label> */}
          <div className="flex gap-2">
            <input
              type="radio"
              id="male"
              name="voiceType"
              value="male"
              checked={voiceType === 'male'}
              onChange={() => setVoiceType('male')}
            />
            <Label htmlFor="male">Male</Label>

            <input
              type="radio"
              id="female"
              name="voiceType"
              value="female"
              checked={voiceType === 'female'}
              onChange={() => setVoiceType('female')}
            />
            <Label htmlFor="female">Female</Label>
          </div>

          <Label htmlFor="paceOfVoice">Pace of Voice</Label>
          <Input
            type="number"
            id="paceOfVoice"
            value={paceOfVoice}
            onChange={(e) => setPaceOfVoice(e.target.value)}
            placeholder="Enter pace of voice (number)"
          />
        </form>
        {/* Show the "Generate Voice" button only if audioUrlFromJson is null */}
        {!audioUrlFromJson && (
          <Button onClick={handleGenerateVoice}>Generate Voice</Button>
        )}
        {/* Show the "Re-generate Voice" button only if audioUrlFromJson is not null */}
        {audioUrlFromJson && (
          <>
            <Button onClick={handleGenerateVoice}>Re-generate Voice</Button>
          </>
        )}
      </div>
      {loading && <p>Generating audio, please wait...</p>}
      {error && <p>{error}</p>}
      {audioUrl && (
        <div className="p-5">
          <audio controls>
            <source src={audioUrl} type="audio/mp3" />
          </audio>
        </div>
      )}
    </section>
  );
}
