'use client';

import Image from 'next/image';
import { memo, useEffect, useState } from 'react';
import { FaGithub, FaLink } from 'react-icons/fa';

interface ProjectsSectionProps {
  onDataLoaded: () => void;
}

const Skeleton = () => (
  <div className="space-y-8">
    {Array.from({ length: 2 }).map((_, index) => (
      <div
        key={index}
        className="flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden shadow-lg animate-pulse"
      >
        {/* 텍스트 영역 스켈레톤 */}
        <div className="p-6 md:w-1/2 flex flex-col justify-center space-y-4">
          <div className="h-6 bg-gray-700 w-3/4 rounded"></div>
          <div className="h-4 bg-gray-700 w-full rounded"></div>
          <div className="h-4 bg-gray-700 w-5/6 rounded"></div>
          <div className="flex gap-2 mt-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-6 w-16 bg-gray-700 rounded"></div>
            ))}
          </div>
          <div className="flex items-center space-x-4 mt-4">
            <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
            <div className="h-6 w-6 bg-gray-700 rounded-full"></div>
          </div>
        </div>

        {/* 이미지 영역 스켈레톤 */}
        <div className="md:w-1/2 relative h-auto aspect-video bg-gray-700 rounded-lg"></div>
      </div>
    ))}
  </div>
);

export default memo(function ProjectsSection({
  onDataLoaded,
}: ProjectsSectionProps) {
  const [projectData, setProjectData] = useState<SideProjectProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjectData(data);
        setLoading(false);
        onDataLoaded();
      } catch (error) {
        console.error('Failed to fetch projects data:', error);
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [onDataLoaded]);

  if (loading) {
    return (
      <section
        id="projects"
        className="py-16 bg-dark text-grayLight min-h-svh flex items-center"
      >
        <div className="container mx-auto px-4 space-y-8">
          <h2 className="text-3xl font-bold mb-12 text-mint text-center">
            Playgrounds
          </h2>
          <Skeleton />
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      className="py-16 bg-dark text-grayLight min-h-svh flex items-center"
    >
      <div className="container mx-auto px-4 space-y-8">
        <h2 className="text-3xl font-bold mb-12 text-mint text-center">
          Playgrounds
        </h2>
        {projectData.map((project) => (
          <div
            key={project.key}
            className="flex flex-col md:flex-row bg-gray-900 rounded-lg overflow-hidden shadow-lg"
          >
            {/* 왼쪽 텍스트 영역 */}
            <div className="p-6 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-mint">{project.name}</h3>
              <p className="text-sm text-gray-400 my-2">
                {project?.intro?.join(' ')}
              </p>
              <div className="flex flex-wrap gap-2 my-4">
                {project.skills.split(',').map((skill, index) => (
                  <span
                    key={index}
                    className="bg-gray-800 px-3 py-1 rounded-md text-sm text-gray-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-center space-x-4 mt-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mint hover:underline"
                >
                  <FaGithub />
                </a>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mint hover:underline"
                >
                  <FaLink />
                </a>
              </div>
            </div>

            {/* 오른쪽 이미지 영역 */}
            <div className="md:w-1/2 relative h-auto aspect-video">
              {project?.image && (
                <Image
                  src={`/api/images${project.image}`}
                  alt={project.name}
                  fill
                  className="rounded-lg object-fill"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});
