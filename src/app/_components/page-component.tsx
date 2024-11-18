'use client';

import AboutMeSection from '@components/about-me-section';
import CareerSection from '@components/career-section';
import ProjectsSection from '@components/project-section';
import SkillsSection from '@components/skill-section';
import { useCallback, useState } from 'react';
import Loading from './loading';

export default function HomePageComponent() {
  const [loadingStates, setLoadingStates] = useState({
    aboutMe: false,
    skills: false,
    career: false,
    projects: false,
  });
  const [loadingCompleted, setLoadingCompleted] = useState(false);

  const allLoaded = Object.values(loadingStates).every((loaded) => loaded);
  const setSectionLoaded = (section: keyof typeof loadingStates) => {
    setLoadingStates((prevState) => ({ ...prevState, [section]: true }));
  };

  const handleAboutMeLoaded = useCallback(
    () => setSectionLoaded('aboutMe'),
    []
  );
  const handleSkillsLoaded = useCallback(() => setSectionLoaded('skills'), []);
  const handleCareerLoaded = useCallback(() => setSectionLoaded('career'), []);
  const handleProjectsLoaded = useCallback(
    () => setSectionLoaded('projects'),
    []
  );

  return (
    <>
      {!loadingCompleted && (
        <Loading onComplete={() => setLoadingCompleted(allLoaded)} />
      )}
      <AboutMeSection onDataLoaded={handleAboutMeLoaded} />
      <SkillsSection onDataLoaded={handleSkillsLoaded} />
      <CareerSection onDataLoaded={handleCareerLoaded} />
      <ProjectsSection onDataLoaded={handleProjectsLoaded} />
    </>
  );
}
