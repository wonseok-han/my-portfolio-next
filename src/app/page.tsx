import Header from '@components/header';
import Hero from '@components/hero';
import Skills from '@components/skills';
import Career from '@components/career';
import Playgrounds from '@components/playgrounds';
import Contact from '@components/contact';
import Footer from '@components/footer';
import { Toaster } from '@/components/ui/sonner';
import { getJsonData } from '@utils/data';

// 동적 렌더링 설정
export const dynamic = 'force-dynamic';

async function fetchPortfolioData() {
  try {
    const [user, skills, careers, projects] = await Promise.all([
      getJsonData<UserProps>('user.json'),
      getJsonData<SkillProps>('skills.json'),
      getJsonData<CompanyProps[]>('careers.json'),
      getJsonData<SideProjectProps[]>('projects.json'),
    ]);

    return {
      user,
      skills,
      careers: careers.sort((a, b) => (a.key < b.key ? 1 : -1)),
      projects: projects.sort((a, b) => (a.key < b.key ? 1 : -1)),
    };
  } catch (error) {
    console.error('데이터 로딩 중 오류 발생:', error);
    return { user: undefined, skills: undefined, careers: undefined, projects: undefined };
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
      <Footer user={user ?? null} />
      <Toaster />
    </div>
  );
}
