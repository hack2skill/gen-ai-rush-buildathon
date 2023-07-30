'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GlobalContextProvider, useGlobalContext } from '@/app/context/store';
import { useRouter } from 'next/navigation';

type Props = {};

type Project = {
  projectName: string;
};

const Page = (props: Props) => {
  const router = useRouter();
  const { project, setProject } = useGlobalContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState('');
  const [projectCreated, setProjectCreated] = useState(false);
  const handleCreateProject = async () => {
    try {
      const response = await fetch(`${process.env.server_url}/create-project`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName: projectName }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message); // Log the response message from the server
        setProjectCreated(true);
        // Perform any additional actions if needed
      } else {
        console.error('Failed to create project');
        // Handle error if needed
      }
    } catch (error) {
      console.error(error);
      // Handle error if needed
    }
  };

  useEffect(() => {
    // Function to fetch projects data from the backend
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${process.env.server_url}/get-projects`);
        // const response = await fetch(`${process.env.SERVER_URL}/get-projects`);
        if (!response.ok) {
          setError(true);
        } else {
          const data = await response.json();
          console.log(data[0].projects);
          setProjects(data[0].projects);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    };

    // Call the fetchProjects function when the component mounts
    fetchProjects();
  }, [projectCreated]); // Empty dependency array ensures this effect runs only once on mount

  // Show loading screen while waiting for the content
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error case
  if (error) {
    return <div>Failed to fetch projects. Please try again later.</div>;
  }
  return (
    <div>
      <section
        id="features"
        className="container space-y-3 bg-background_transparent  py-8 dark:bg-transparent md:py-12 lg:py-24 rounded-3xl"
      >
        <div className="mx-auto flex max-w-[58rem]  flex-col items-center space-y-6 text-center p-5">
          <h3 className="font-heading text-2xl  leading-[1.1] sm:text-3xl md:text-4xl">
            Create a Project
          </h3>
          <div className="flex p-4 w-full max-w-sm items-center space-x-2">
            <div className="flex p-4 w-full max-w-sm items-center space-x-2">
              <Input
                type="text"
                placeholder="Project Name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
              <Button
                type="submit"
                className="w-fit"
                onClick={handleCreateProject}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
        <div className="mx-auto flex max-w-[58rem]  flex-col items-center space-y-4 text-center">
          <h3 className="font-heading text-2xl  leading-[1.1] sm:text-3xl md:text-4xl">
            Select a Project
          </h3>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {projects.map((project, index) => (
            <Button
              key={index}
              className="flex flex-col justify-between rounded-md"
              onClick={() => {
                setProject(project.projectName);
                router.push(`/project/${project.projectName}`);
              }}
            >
              <div className="space-y-2">
                <h3 className="font-bold">{project.projectName}</h3>
              </div>
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Page;
