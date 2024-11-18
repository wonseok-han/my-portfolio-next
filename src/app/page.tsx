import CareerSection from '@components/career-section';

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

      <section
        id="projects"
        className="h-screen flex items-center justify-center"
      >
        <h1 className="text-4xl">Projects</h1>
      </section>
    </div>
  );
}
