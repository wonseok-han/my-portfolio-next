import CareerSection from '@components/career-section';
import ProjectsSection from '@components/project-section';

export default function HomePage() {
  return (
    <div>
      <section
        id="about-me"
        className="h-screen flex items-center justify-center"
      >
        <h1 className="text-4xl">About Me</h1>
      </section>
      <section
        id="skills"
        className="h-screen flex items-center justify-center"
      >
        <h1 className="text-4xl">Skills</h1>
      </section>

      <CareerSection />

      <ProjectsSection />
    </div>
  );
}
