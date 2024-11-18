import AboutMeSection from '@components/about-me-section';
import CareerSection from '@components/career-section';
import ProjectsSection from '@components/project-section';
import SkillsSection from '@components/skill-section';

export default function HomePage() {
  return (
    <div>
      <AboutMeSection />
      <SkillsSection />
      <CareerSection />
      <ProjectsSection />
    </div>
  );
}
