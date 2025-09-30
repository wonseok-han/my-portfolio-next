import Header from '@components/header';
import Hero from '@components/hero';
import Skills from '@components/skills';
import Career from '@components/career';
import Playgrounds from '@components/playgrounds';
import Contact from '@components/contact';
import Footer from '@components/footer';
import { Toaster } from '@/components/ui/sonner';

// 동적 렌더링 설정
export const dynamic = 'force-dynamic';

/**
 * 서버 컴포넌트에서 데이터를 fetch
 */
async function fetchPortfolioData() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const [userRes, skillsRes, careersRes, projectsRes] = await Promise.all([
      fetch(`${baseUrl}/api/user`, { next: { revalidate: 0 } }),
      fetch(`${baseUrl}/api/skills`, { next: { revalidate: 0 } }),
      fetch(`${baseUrl}/api/careers`, { next: { revalidate: 0 } }),
      fetch(`${baseUrl}/api/projects`, { next: { revalidate: 0 } }),
    ]);

    const user = userRes.ok ? await userRes.json() : null;
    const skills = skillsRes.ok ? await skillsRes.json() : null;
    const careers = careersRes.ok ? await careersRes.json() : null;
    const projects = projectsRes.ok ? await projectsRes.json() : null;

    return { user, skills, careers, projects };
  } catch (error) {
    console.error('데이터 로딩 중 오류 발생:', error);
    return { user: null, skills: null, careers: null, projects: null };
  }
}

/**
 * 홈 페이지 (Server Component)
 * 서버에서 데이터를 fetch하여 SSR 적용
 */
export default async function HomePage() {
  const { user, skills, careers, projects } = await fetchPortfolioData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero user={user} />
        <Skills skills={skills} />
        <Career careers={careers} />
        <Playgrounds projects={projects} />
        <Contact user={user} />
      </main>
      <Footer user={user} />
      <Toaster />
    </div>
  );
}
