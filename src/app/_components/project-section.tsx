'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function ProjectsSection() {
  const [projectData, setProjectData] = useState<SideProjectProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        setProjectData(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch projects data:', error);
        setLoading(false);
      }
    };

    fetchProjectData();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-mint">Loading projects data...</div>
    );
  }

  return (
    <section
      id="projects"
      className="py-16 bg-dark text-grayLight min-h-svh flex items-center"
    >
      <div className="container mx-auto px-4 space-y-8">
        <h2 className="text-3xl font-bold mb-12 text-mint text-center">
          Projects
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
              <div className="flex items-center space-x-4 mt-4">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mint hover:underline"
                >
                  GitHub
                </a>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mint hover:underline"
                >
                  Live Demo
                </a>
              </div>
            </div>

            {/* 오른쪽 이미지 영역 */}
            <div className="md:w-1/2 relative h-auto aspect-video">
              {project?.image && (
                <Image
                  src={project.image}
                  alt={project.name}
                  layout="fill"
                  className="rounded-lg"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
